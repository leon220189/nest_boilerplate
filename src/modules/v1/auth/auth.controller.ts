import {
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
	Body,
	HttpCode,
	HttpStatus,
	Res,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

// Guard
import {
	LocalAuthGuard,
	JwtAuthGuard,
	RefreshAuthGuard,
	CsrfGuard,
	RoleGuard,
} from './../../../guards';
import { Roles, AuthUser } from './../../../decorators';
import { Role } from './../../../../libs/enums';

// Service
import { JWTAuthService } from './jwt/jwt.auth.service';
import { UserService } from './../user/user.service';
import { UtilsService } from './../../../../libs/utils/util.service';

// Entity
import { UserEntity } from './../../../model';

// Interface
import { authReponse } from './interfaces/auth.interface';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { HttpErrors } from './../../../../libs/const/httpMessages.const';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly jwtAuthService: JWTAuthService,
		private readonly userService: UserService,
		private readonly httpErrors: HttpErrors,
		private readonly utils: UtilsService,
		private readonly configService: ConfigService,
	) {}

	@Post('/register')
	@HttpCode(HttpStatus.OK)
	async create(@Body() userData: CreateUserDto): Promise<UserEntity> {
		try {
			await this.userService.register(userData);
			delete userData['confirm_password'];
			return plainToClass(UserEntity, userData);
		} catch (err) {
			if (
				this.utils.getProp(err, 'code', null) ==
				this.httpErrors.getErrors().DuplicateDatabase.code
			) {
				throw this.httpErrors.getErrorResponse('DuplicateDatabase');
			}

			throw this.httpErrors.getErrorResponse('Generic');
		}
	}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	@HttpCode(HttpStatus.OK)
	async login(
		@Req() req: Request | any,
		@Res({ passthrough: true }) res: Response,
	): Promise<{ otp: string }> {
		try {
			const csrf = await this.jwtAuthService.generateCSRFToken();
			req.session.secretKey = csrf.csrf_serect;
			const csrfHeaderName =
				this.configService.get<string>('CSRF_TOKEN_HEADER')?.trim() ||
				'X-CSRF-Token';

			// Validate the header name
			if (!/^[\w!#$%&'*+.^_`|~-]+$/.test(csrfHeaderName)) {
				throw new Error(`Invalid CSRF token header name: ${csrfHeaderName}`);
			}

			res.setHeader(csrfHeaderName, csrf.csrf_token);

			return this.jwtAuthService.login(req.user);
		} catch (err) {
			throw this.httpErrors.getErrorResponse('Generic');
		}
	}

	@UseGuards(CsrfGuard)
	@Post('/otp')
	@HttpCode(HttpStatus.OK)
	async verifyOTP(
		@Body() payload: any,
		@Res({ passthrough: true }) res: Response,
	): Promise<authReponse> {
		try {
			const auth = await this.jwtAuthService.verifyOTP(payload);
			this.jwtAuthService.storeAuthTokenInCookie(res, {
				access_token: auth.access_token,
				refresh_token: auth.refresh_token,
			});
			return auth;
		} catch (err) {
			console.log('🚀 ~ AuthController ~ err:', err);

			throw this.httpErrors.getErrorResponse('Generic');
		}
	}

	@Roles(Role.SUPERVISOR)
	@UseGuards(JwtAuthGuard, RoleGuard)
	@Get('/status')
	@HttpCode(HttpStatus.OK)
	async myProfile(@AuthUser() authUser: any): Promise<any> {
		const user = await this.userService.findById(authUser.id);
		return {
			...plainToClass(UserEntity, user),
			authUser,
		};
	}

	@UseGuards(RefreshAuthGuard)
	@Get('/refresh-token')
	@HttpCode(HttpStatus.OK)
	async refreshToken(
		@Req() req: Request | any,
		@Res({ passthrough: true }) res: Response,
	): Promise<authReponse> {
		try {
			if (!req?.signedCookies?.refresh_token)
				throw this.httpErrors.getErrorResponse('InvalidAuthToken');
			const auth = await this.jwtAuthService.refreshToken(
				req.signedCookies.refresh_token,
			);
			this.jwtAuthService.storeAuthTokenInCookie(res, {
				access_token: auth.access_token,
				refresh_token: auth.refresh_token,
			});
			return auth;
		} catch (err) {
			throw err;
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('/logout')
	@HttpCode(HttpStatus.OK)
	async logout(
		@Req() req: Request | any,
		@Res({ passthrough: true }) res: Response,
	): Promise<any> {
		try {
			await this.jwtAuthService.clearAuthTokenInCookie(res);
			req.session.destroy((err: any) => err);
			return;
		} catch (err) {
			throw err;
		}
	}
}
