import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { VerifyOtpDto } from './otp.dto';

export function ApiVerifyOtp() {
	return applyDecorators(
		ApiOperation({ summary: 'Verify OTP' }),
		ApiHeader({
			name: '__Host-blank.X-CSRF-Token',
			description: 'CSRF token received from the login endpoint',
			required: true,
		}),
		ApiBody({
			description: 'User OTP verification payload',
			type: VerifyOtpDto,
		}),
		ApiResponse({
			status: 200,
			description: 'OTP verification successful',
			schema: {
				example: {
					access_token: 'access-token',
					refresh_token: 'refresh-token',
				},
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
