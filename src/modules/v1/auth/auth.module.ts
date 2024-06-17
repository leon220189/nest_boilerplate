import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Module
import { MailModule } from './../mail/mail.module';
import { UserModule } from './../user/user.module';
import { RolesModule } from './../role/role.module';
import { ConstModule } from './../../../../libs/const/const.module';
import { UtilsModule } from './../../../../libs/utils/util.module';
import { GoogleOAuthModule } from './google/google.oauth.module';

// Controller
import { AuthController } from './auth.controller';

// Service
import { JWTAuthService } from './jwt/jwt.auth.service';

// Strategy
import {
	LocalStrategy,
	JwtStrategy,
	RefreshStrategy,
	GoogleOAuthStrategy,
} from '../../../strategies';

@Module({
	imports: [
		UserModule,
		ConfigModule,
		ConstModule,
		UtilsModule,
		MailModule,
		RolesModule,
		GoogleOAuthModule,
	],
	providers: [
		JWTAuthService,
		LocalStrategy,
		JwtStrategy,
		RefreshStrategy,
		GoogleOAuthStrategy,
	],
	controllers: [AuthController],
})
export class AuthModule {}
