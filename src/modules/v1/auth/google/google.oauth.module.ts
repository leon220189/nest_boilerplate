import { Module } from '@nestjs/common';
import { UserModule } from './../../user/user.module';
import { JWTAuthModule } from './../../auth/jwt/jwt.auth.module';
import { GoogleOauthController } from './google.oauth.controller';
import { GoogleOAuthStrategy } from './../../../../strategies';

@Module({
	imports: [UserModule, JWTAuthModule],
	controllers: [GoogleOauthController],
	providers: [GoogleOAuthStrategy],
})
export class GoogleOAuthModule {}
