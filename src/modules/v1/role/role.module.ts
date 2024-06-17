import { Module } from '@nestjs/common';

import { TypeOrmExModule } from './../../../../libs/repository/typeorm-ex.module';

import { RoleEntity, UserRoleEntity, UserEntity } from './../../../model';

import { RolesService } from './role.service';
import { UserRolesService } from './user.role.service';

import { RoleRepository } from './role.repository';
import { UserRoleRepository } from './user.role.repository';
import { UserRepository } from './../user/user.repository';

import { RoleController } from './role.controller';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([
			RoleEntity,
			RoleRepository,
			UserRoleEntity,
			UserRoleRepository,
			UserEntity,
			UserRepository,
		]),
	],
	providers: [RolesService, UserRolesService],
	exports: [RolesService, UserRolesService, TypeOrmExModule],
	controllers: [RoleController],
})
export class RolesModule {}
