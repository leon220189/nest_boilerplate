import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export function ApiLogin() {
	return applyDecorators(
		ApiOperation({ summary: 'User login' }),
		ApiBody({
			description: 'User login credentials',
			type: LoginDto,
		}),
		ApiResponse({
			status: 200,
			description: 'The found record',
			schema: {
				example: { otp: '123456' },
			},
		}),
		ApiResponse({
			status: 400,
			description: 'Invalid input',
		}),
		ApiResponse({
			status: 401,
			description: 'Unauthorized',
		}),
	);
}
