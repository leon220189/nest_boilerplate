import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
	@ApiProperty({
		description: 'Mobile number of the user',
		example: '1234567890',
	})
	mobile_number: string;

	@ApiProperty({
		description: 'OTP number received by the user',
		example: 608516,
	})
	otp_number: string;
}
