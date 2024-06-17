import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
const Tokens = require('csrf'); // eslint-disable-line

const tokenProvider = new Tokens({
	secretLength: 16,
	saltLength: 16,
});

@Injectable()
export class CSRFService {
	constructor(private readonly configService: ConfigService) {}

	generateCSRFSecret() {
		return tokenProvider.secretSync();
	}

	generateCSRFToken(secret: string) {
		return tokenProvider.create(secret);
	}

	verify(secret: string, token: string) {
		return tokenProvider.verify(secret, token);
	}

	getCsrfFromRequest(req: any) {
		const token =
			this.configService
				.get<string>('CSRF_TOKEN_HEADER')
				?.trim()
				.toLowerCase() ?? '__host-blank.x-csrf-token';

		return (
			(req.body && req.body._csrf) ||
			(req.query && req.query._csrf) ||
			req.headers['csrf-token'] ||
			req.headers['xsrf-token'] ||
			req.headers['x-csrf-token'] ||
			req.headers['x-xsrf-token'] ||
			req.headers[token]
		);
	}
}
