import { Injectable } from '@nestjs/common';

import { UserRoleEntity } from './../../../model';
import { UserRoleRepository } from './user.role.repository';
import { BaseAbstractService } from './../../../../libs/service/base.service';

@Injectable()
export class UserRolesService extends BaseAbstractService<
	UserRoleEntity,
	UserRoleRepository
> {
	constructor(repository: UserRoleRepository) {
		super(repository);
	}
}
