/* eslint-disable */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from './../../../../guards';
// import { JWTAuthService } from './../../auth/jwt/jwt.auth.service';

@Controller('auth/google')
export class GoogleOauthController {
	constructor() {} // private jwtAuthService: JWTAuthService

	@Get()
	@UseGuards(GoogleOAuthGuard)
	async googleAuth(@Req() _req: Request | any) {
		// Guard redirects
	}

	@Get('redirect')
	@UseGuards(GoogleOAuthGuard)
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		// const { accessToken } = this.jwtAuthService.login(req.user);
		// res.cookie(SESSION_COOKIE_KEY, accessToken, {
		//   httpOnly: true,
		//   sameSite: 'lax',
		// });
		// return res.redirect('/profile');
	}
}
