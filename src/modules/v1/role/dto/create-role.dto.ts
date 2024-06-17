import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
	@IsNotEmpty()
	name: string;

	@IsOptional()
	parent_id: string;
}
