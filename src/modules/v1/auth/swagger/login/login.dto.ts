import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({
		description: 'Mobile number of the user',
		example: '1234567890',
	})
	mobile_number: string;

	@ApiProperty({
		description: 'Password of the user',
		example: 'hashedpassword',
	})
	password: string;
}
