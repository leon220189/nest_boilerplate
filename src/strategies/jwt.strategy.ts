import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET_KEY')?.trim(),
		});
	}

	async validate(payload: any) {
		return payload;
	}

	private static extractJWT(req: Request): string | null {
		if (req.signedCookies && 'access_token' in req.signedCookies) {
			return req.signedCookies.access_token;
		}
		return null;
	}
}
