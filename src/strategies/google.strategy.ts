/* eslint-disable */
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './../modules/v1/user/user.service';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		configService: ConfigService,
		private readonly userService: UserService,
	) {
		super({
			clientID: configService.get<string>('GOOGLE_APP_ID')?.trim(),
			clientSecret: configService.get<string>('GOOGLE_APP_SECRET')?.trim(),
			callbackURL: configService.get<string>('GOOGLE_APP_REDIRECT_URL')?.trim(),
			scope: ['email', 'profile'],
		});
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
	) {
		const { id, name, emails } = profile;
		console.log(
			'🚀 ~ file: google.strategy.ts:27 ~ GoogleOAuthStrategy ~ classGoogleOAuthStrategyextendsPassportStrategy ~ profile:',
			profile,
		);

		// let user = await this.userService.findOne({
		//   where: { provider: 'google', providerId: id },
		// });
		// if (!user) {
		//   user = await this.userService.create({
		//     provider: 'google',
		//     providerId: id,
		//     name: name.givenName,
		//     username: emails[0].value,
		//   });
		// }

		// return user;
		return profile;
	}
}
