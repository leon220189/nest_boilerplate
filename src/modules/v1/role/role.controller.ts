import {
	Controller,
	Post,
	UseGuards,
	HttpCode,
	HttpStatus,
	Body,
	Get,
} from '@nestjs/common';

import { RolesService } from './role.service';
import { JwtAuthGuard } from './../../../guards';

import { CreateRoleDto } from './dto/create-role.dto';

import { Roles } from './../../../decorators';
import { Role } from './../../../../libs/enums';

@Controller('role')
export class RoleController {
	constructor(private readonly rolesService: RolesService) {}

	@Post('/create-init')
	@HttpCode(HttpStatus.OK)
	async createRoleInit(@Body() roleData: CreateRoleDto): Promise<any> {
		return await this.rolesService.createRole(roleData);
	}

	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard)
	@Post('/create')
	@HttpCode(HttpStatus.OK)
	async createRole(@Body() roleData: CreateRoleDto): Promise<any> {
		return await this.rolesService.createRole(roleData);
	}

	@Get('/hello')
	@HttpCode(HttpStatus.OK)
	hello() {
		return 'hello my fen ####################';
	}
}
