import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Put,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm/index';

import { UserEntity } from './../../../model';

import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from './../../../guards';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	index(): Promise<UserEntity[]> {
		return this.userService.index();
	}

	@Get('/inactive')
	getInactiveUser(): Promise<UserEntity[]> {
		return this.userService.getInactiveUsers();
	}

	@Get('/:id')
	async show(@Param('id') id: EntityId): Promise<UserEntity> {
		const user = await this.userService.findById(id);
		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	@Put('/:id')
	update(
		@Param('id') id: EntityId,
		@Body() userData: UpdateUserDto,
	): Promise<UserEntity> {
		return this.userService.update(id, userData);
	}

	@Delete('/:id')
	destroy(@Param('id') id: EntityId): Promise<DeleteResult> {
		return this.userService.delete(id);
	}
}
