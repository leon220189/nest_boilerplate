import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NestTypeOrmCommandsModule } from 'nestjs-typeorm-commands';

import { AppService } from './app.service';
import { configuration } from '../config/configuration';

// Module imports
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/user/user.module';
import { UserProfileModule } from './modules/v1/userProfile/user.profile.module';
import { RolesModule } from './modules/v1/role/role.module';
import { ConstModule } from '../libs/const/const.module';
import { UtilsModule } from '../libs/utils/util.module';
import { MailModule } from './modules/v1/mail/mail.module';

import getOrmConfig from '../orm/ormconfig';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: async (): Promise<TypeOrmModuleOptions> => {
				const ormConfig = await getOrmConfig();
				return {
					...ormConfig,
					autoLoadEntities: true,
				};
			},
		}),
		NestTypeOrmCommandsModule.forRoot({
			migrationsDir: 'migrations',
		}),
		AuthModule,
		UserModule,
		UserProfileModule,
		ConstModule,
		UtilsModule,
		MailModule,
		RolesModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
