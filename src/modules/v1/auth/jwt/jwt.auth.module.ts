import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Module
import { MailModule } from './../../mail/mail.module';
import { UserModule } from './../../user/user.module';
import { UtilsModule } from './../../../../../libs/utils/util.module';

// Service
import { JWTAuthService } from './jwt.auth.service';

// Repository
import { UserRepository } from './../../user/user.repository';
import { UserProfileRepository } from './../../userProfile/user.profile.repository';

// Entity
import { UserEntity, UserProfileEntity } from './../../../../model';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			UserRepository,
			UserProfileEntity,
			UserProfileRepository,
		]),
		ConfigModule,
		UserModule,
		UtilsModule,
		MailModule,
	],
	providers: [JWTAuthService],
})
export class JWTAuthModule {}
