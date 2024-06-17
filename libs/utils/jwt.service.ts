import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	generateAccessToken(payload: object) {
		const payloadWithProps = payload as { type: string; time: number };
		payloadWithProps.type = 'access_token';
		payloadWithProps.time = new Date().getTime();
		return this.jwtService.signAsync(payloadWithProps, {
			expiresIn:
				this.configService.get<string>('ACCESS_TOKEN_EXPIRE_TIME')?.trim() ??
				'3600s',
		});
	}

	generateRefreshToken(payload: object) {
		const payloadWithProps = payload as { type: string; time: number };
		payloadWithProps.type = 'refresh_token';
		payloadWithProps.time = new Date().getTime();
		return this.jwtService.signAsync(payloadWithProps, {
			expiresIn:
				this.configService.get<string>('REFRESH_TOKEN_EXPIRE_TIME')?.trim() ??
				'86400s',
		});
	}

	verify(token: string) {
		return this.jwtService.verifyAsync(token, {
			secret: this.configService.get<string>('JWT_SECRET_KEY')?.trim(),
		});
	}
}
