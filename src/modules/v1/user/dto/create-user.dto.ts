import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	Length,
	Matches,
} from 'class-validator';
import { Match } from './../../../../../libs/validations/match.validation';

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	email_address: string;

	@IsNotEmpty()
	first_name: string;

	@IsNotEmpty()
	last_name: string;

	@IsNotEmpty()
	@Length(8, 24)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'password must include at least one uppercase and one special character',
	})
	password: string;

	@IsNotEmpty()
	@Length(8, 24)
	@Match<CreateUserDto>('password')
	confirm_password?: string;

	@IsNotEmpty()
	@Length(1, 3)
	area_code: string;

	@IsNotEmpty()
	@Length(9, 16)
	mobile_number: string;

	@IsOptional()
	role: string;

	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === 'true') // issue with class-transformer, use this to convert
	is_verified: boolean;

	@IsOptional()
	bank_branch: string;

	@IsOptional()
	bank_name: string;

	@IsOptional()
	bank_number: string;

	@IsOptional()
	birth_date: 'datetime';

	@IsOptional()
	address: string;

	@IsOptional()
	gender: string;

	@IsOptional()
	tax: string;
}
