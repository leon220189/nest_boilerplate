import { Injectable } from '@nestjs/common';

import { BaseAbstractService } from './../../../../libs/service/base.service';
import { UserProfileEntity } from './../../../model';
import { UserProfileRepository } from './user.profile.repository';

@Injectable()
export class UserProfileService extends BaseAbstractService<
	UserProfileEntity,
	UserProfileRepository
> {
	constructor(repository: UserProfileRepository) {
		super(repository);
	}
}
