import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UtilsService, JWTService, TFAService, CSRFService } from './../utils';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET_KEY')?.trim(),
			}),
			inject: [ConfigService],
		}),
	],
	exports: [UtilsService, JWTService, TFAService, CSRFService],
	providers: [UtilsService, JWTService, TFAService, CSRFService],
})
export class UtilsModule {}
