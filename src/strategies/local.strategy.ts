import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JWTAuthService } from './../modules/v1/auth/jwt/jwt.auth.service';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly jwtAuthService: JWTAuthService) {
		super({
			usernameField: 'mobile_number', // this use for validate field name at frontend send via payload, must the same field name
		});
	}

	validate(mobile: string, password: string): Promise<UserEntity> {
		return this.jwtAuthService.validateUser(mobile, password);
	}
}
