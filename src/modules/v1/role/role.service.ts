import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { IsNull } from 'typeorm';

import { RoleEntity } from './../../../model';
import { RoleRepository } from './role.repository';
import { BaseAbstractService } from './../../../../libs/service/base.service';

import { UserRolesService } from './user.role.service';

@Injectable()
export class RolesService extends BaseAbstractService<
	RoleEntity,
	RoleRepository
> {
	constructor(
		repository: RoleRepository,
		private readonly userRolesService: UserRolesService,
	) {
		super(repository);
	}

	getRoleByID(roleId: number): Promise<RoleEntity | null> {
		return this.repository.findOne({
			where: {
				id: roleId,
			},
		});
	}

	async createRole(data: any): Promise<any> {
		try {
			const allowedParameters = ['name', 'parent_id'];
			const roleData = _.pick(data, allowedParameters);

			if (roleData.parent_id) {
				const _checkRole: any = this.repository.findOneBy(roleData.parent_id);
				if (!_checkRole) {
					throw new Error(`Role with id ${roleData.parent_id} not found`);
				}
			}

			const _role: any = this.repository.create(roleData); // need create before save this issue TypeORM
			const userInserted = await this.repository.save(_role);

			return userInserted;
		} catch (error) {
			return error;
		}
	}

	async hasRole(userId: number, roleName: string): Promise<boolean> {
		try {
			const role = await this.repository.findOne({
				where: {
					name: roleName,
				},
			});

			if (!role) return false;

			const userRole = await this.userRolesService.findOne({
				user_id: userId,
				role_id: role.id,
			});
			if (userRole) return true;

			const parentRole = await this.repository.findOneBy({
				id: role.parent_id ?? IsNull(),
			});
			if (!parentRole) return false;

			//  recursively checks if the user has the parent role
			return await this.hasRole(userId, parentRole.name);
		} catch (error) {
			return false;
		}
	}
}
