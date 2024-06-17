import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { CSRFService } from './../../libs/utils';
import { HttpErrors } from './../../libs/const/httpMessages.const';

@Injectable()
export class CsrfGuard implements CanActivate {
	constructor(
		private readonly csrf: CSRFService,
		private readonly httpErrors: HttpErrors,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();

		// Check if the request method is safe, i.e. GET, HEAD, or OPTIONS
		if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
			return true;
		}

		// Check if the CSRF token in the request header matches the one in the cookie
		const csrfToken = this.csrf.getCsrfFromRequest(request);
		const secret = request.session.secretKey;

		if (!secret || !csrfToken) {
			throw this.httpErrors.getErrorResponse('NotFoundCrsfToken');
		}
		if (!this.csrf.verify(secret, csrfToken)) {
			throw this.httpErrors.getErrorResponse('InvalidCrsfToken');
		}

		return true;
	}
}
