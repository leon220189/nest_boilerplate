import {
	BadRequestException,
	Injectable,
	NotFoundException,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import moment from 'moment';

import { UserService } from '../../user/user.service';
import { JWTService, TFAService, CSRFService } from '../../../../../libs/utils';
import { MailService } from '../../mail/mail.service';

import { UserEntity } from '../../../../model';

import { authReponse } from '../interfaces/auth.interface';

import { AuthTokenDto } from '../dto/auth-token.dto';

@Injectable()
export class JWTAuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JWTService,
		private readonly configService: ConfigService,
		private readonly tfaService: TFAService,
		private readonly mailService: MailService,
		private readonly csrf: CSRFService,
	) {}

	async validateUser(mobile: string, password: string): Promise<UserEntity> {
		const user = await this.userService.findByMobileNumber(mobile);
		if (!user) throw new NotFoundException(`${mobile} is not found`);

		await this.unavailableUser(user, password);
		return user;
	}

	async login(user: UserEntity): Promise<{ otp: string }> {
		user.otp_request_count = this.validateOtpRequestCount(user);
		// Generate secret key if User does not have one.
		let _secret_key: any = user.otp_key;
		if (_.isEmpty(user.otp_key)) {
			_secret_key = this.tfaService.generateSecret();
			await this.userService.update(
				{ id: user.id },
				{
					otp_key: _secret_key.ascii,
				},
			);
			_secret_key = _secret_key.ascii;
		}

		// Generate OTP. OTP lasts 30 seconds only.
		const _otp = this.tfaService.generateTOTP(_secret_key);
		// send via email or sms or something
		// if (_otp) {
		// 	await this.mailService.sendUserConfirmation(user, _otp);
		// }
		await this.userService.update(
			{ id: user.id },
			{
				otp_number: _otp,
				otp_request_count: +user.otp_request_count + 1,
				otp_requested_date: new Date(),
			},
		);

		return { otp: _otp };
	}

	async verifyOTP(payload: any): Promise<authReponse> {
		const _user = await this.userService.findByMobileNumber(
			payload.mobile_number,
		);

		if (!_user)
			throw new NotFoundException(`${payload.mobile_number} is not found`);

		// verify OTP code
		const _isValidOTP = this.tfaService.verify(
			_user.otp_key,
			payload.otp_number,
		);
		if (!_isValidOTP) throw new BadRequestException(`OTP code is not correct`);

		await this.userService.update(
			{ id: _user.id },
			{
				otp_number: null,
				otp_request_count: 0,
			},
		);

		const data = {
			mobile: payload.mobile_number,
			id: _user.id,
			role: _user.role,
		};
		const accessToken = await this.jwtService.generateAccessToken(data);
		const _verify: any = this.jwtService.verify(accessToken);

		return {
			access_token: accessToken,
			refresh_token: await this.jwtService.generateRefreshToken(data),
			expires_after: moment(new Date(_verify.exp * 1000)).format(
				'YYYY-MM-DD HH:mm:ssZ',
			).length,
			user: _user,
			message: 'Verify OTP successful',
		};
	}

	async generateCSRFToken() {
		const csrfSerect = await this.csrf.generateCSRFSecret();
		const csrfToken = await this.csrf.generateCSRFToken(csrfSerect);

		return {
			csrf_serect: csrfSerect,
			csrf_token: csrfToken,
		};
	}

	async unavailableUser(user: UserEntity, password: string): Promise<void> {
		if (!user)
			throw new UnauthorizedException('Mobile number or password is incorrect');

		if (user.status === 'Locked') throw new BadRequestException('User is lock');

		if (user.status === 'Suspended')
			throw new BadRequestException('User is suspend');

		const compareResult = await bcrypt.compare(password, user.password);

		if (!compareResult)
			throw new UnauthorizedException('Mobile number or password is incorrect');
	}

	validateOtpRequestCount(user: UserEntity) {
		if (
			user.otp_requested_date &&
			moment(user.otp_requested_date).add(1, 'hours').isAfter(moment()) &&
			user.otp_request_count >= 5
		) {
			throw new BadRequestException('User is maximum_otp');
		}

		return (user.otp_request_count = 0);
	}

	// need to change how to return user object only with fields filter
	async refreshToken(refreshToken: string) {
		const _verifyToken: any = await this.jwtService.verify(refreshToken);
		if (!_verifyToken) throw new BadRequestException('Token invalid');

		let _query = `
			SELECT u.* FROM "Users" u
		`;
		if (_verifyToken.id) {
			_query += ` WHERE u.id=${_verifyToken.id}`;
			_query += ` AND u.status != 'Suspended'`;
		}

		const _user: any = await this.userService.query(_query);
		const userReponse = _user.map(
			(x: {
				id: number;
				email_address: string;
				first_name: string;
				last_name: string;
				area_code: string;
				is_verified: boolean;
				status: string;
				mobile_number: number;
			}) => {
				return {
					id: x.id,
					email_address: x.email_address,
					first_name: x.first_name,
					last_name: x.last_name,
					area_code: x.area_code,
					mobile_number: x.mobile_number,
					status: x.status,
					is_verified: x.is_verified,
					full_name: `${x.first_name} ${x.last_name}`,
				};
			},
		);

		if (!_user) throw new BadRequestException('User is suspended');

		const data = {
			mobile: _user[0].mobile_number,
			id: _user[0].id,
		};

		const accessToken = await this.jwtService.generateAccessToken(data);
		const _verify: any = this.jwtService.verify(accessToken);

		return {
			access_token: accessToken,
			refresh_token: await this.jwtService.generateRefreshToken(data),
			expires_after: moment(new Date(_verify.exp * 1000)).format(
				'YYYY-MM-DD HH:mm:ssZ',
			).length,
			user: userReponse,
			message: 'Refresh Token successful',
		};
	}

	storeAuthTokenInCookie(
		@Res({ passthrough: true }) res: Response,
		authToken: AuthTokenDto,
	) {
		const maxAgeAccessToken: any =
			this.configService.get<string>('ACCESS_COOKIE_EXPIRE_TIME')?.trim() ??
			900000; // 15 minutes
		const maxAgeRefeshToken: any =
			this.configService.get<string>('REFRESH_COOKIE_EXPIRE_TIME')?.trim() ??
			604800000; // 7 days

		res.cookie('access_token', authToken.access_token, {
			maxAge: parseInt(maxAgeAccessToken),
			httpOnly: true,
			signed: true,
		});
		res.cookie('refresh_token', authToken.refresh_token, {
			maxAge: maxAgeRefeshToken,
			httpOnly: true,
			signed: true,
		});
		return;
	}

	clearAuthTokenInCookie(@Res({ passthrough: true }) res: Response) {
		const cookieOption = {
			httpOnly: true,
			signed: true,
		};

		res.clearCookie('access_token', cookieOption);
		res.clearCookie('refresh_token', cookieOption);
		res.clearCookie('connect.sid', cookieOption);
		return;
	}
}
