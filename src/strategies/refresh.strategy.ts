import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				RefreshStrategy.extractJWT,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET_KEY')?.trim(),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: any) {
		const refreshToken = req.signedCookies.refresh;
		return { ...payload, refreshToken };
	}

	private static extractJWT(req: Request): string | null {
		if (req.signedCookies && 'refresh_token' in req.signedCookies) {
			return req.signedCookies.refresh_token;
		}
		return null;
	}
}
