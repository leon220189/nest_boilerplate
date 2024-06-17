import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: console,
	});
	if (process.env.ENVIRONMENT !== 'production') {
		app.enableCors({
			allowedHeaders: '*',
			origin: '*',
			credentials: true,
		});
	} else {
		app.enableCors({
			origin: process.env.FE_URL,
			credentials: true,
		});
	}
	const configService = app.get(ConfigService);
	const PORT = configService.get('PORT') ?? 3000;
	app.setGlobalPrefix(configService.get('API_PREFIX') ?? '/v1');
	app.useGlobalPipes(
		new ValidationPipe({
			disableErrorMessages: configService.get('DISABLE_ERROR_MESSAGE'),
			whitelist: configService.get('WHITE_LIST'),
		}),
	);

	// parse request body
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	// cookies
	app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

	// sessions
	app.use(
		session({
			secret: process.env.SESSION_SECRET_KEY ?? '',
			resave: false,
			saveUninitialized: false,
		}),
	);

	await app.listen(PORT, () =>
		console.log(`Application running on port ${PORT}`),
	);
}
bootstrap();
