import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseAbstractService } from './../../../../libs/service/base.service';
import { UserRepository } from './user.repository';

// Entity
import {
	UserEntity,
	UserProfileEntity,
	UserRoleEntity,
} from './../../../model';

// services
import { UtilsService } from './../../../../libs/utils/util.service';
import { RolesService } from './../role/role.service';

@Injectable()
export class UserService extends BaseAbstractService<
	UserEntity,
	UserRepository
> {
	constructor(
		repository: UserRepository,
		@InjectEntityManager()
		private readonly entityManager: EntityManager,
		private readonly utils: UtilsService,
		private readonly rolesService: RolesService,
	) {
		super(repository);
	}

	async register(data: any): Promise<any> {
		try {
			const allowedUserParameters = [
				'email_address',
				'first_name',
				'last_name',
				'password',
				'status',
				'area_code',
				'mobile_number',
				'is_verified',
				'device_id',
				'device_fcm_token',
				'role',
			];
			const userData = _.pick(data, allowedUserParameters);
			userData.mobile_number = this.utils.phoneFormat(userData.mobile_number);

			let userInserted: UserEntity | null = null;
			let userProfileInserted: UserProfileEntity;

			await this.entityManager.transaction(async (entityManager) => {
				userInserted = entityManager.create(UserEntity, userData);
				userInserted = await entityManager.save(userInserted);

				if (!userInserted) {
					throw new Error(`Failed to create user`);
				}

				const allowedUserProfileParameters = [
					'bank_branch',
					'bank_name',
					'bank_number',
					'birth_date',
					'address',
					'gender',
					'tax',
				];
				const userProfileData = _.pick(data, allowedUserProfileParameters);
				userProfileData.user = userInserted;

				userProfileInserted = entityManager.create(
					UserProfileEntity,
					userProfileData,
				);
				userProfileInserted = await entityManager.save(userProfileInserted);

				if (!userProfileInserted) {
					throw new Error(`Failed to create user profile`);
				}

				const role = await this.rolesService.findOne({
					name: userInserted.role,
				});

				if (!role) {
					throw new Error(`Role name ${userInserted.role} not found`);
				}

				const userRoleData = {
					user_id: userInserted.id,
					role_id: role.id,
				};
				const userRoleInserted = entityManager.create(
					UserRoleEntity,
					userRoleData,
				);
				await entityManager.save(userRoleInserted);

				userInserted.profile = userProfileInserted;
			});

			return userInserted;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to create user: ${error.message}`);
		}
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		return this.repository.findOneBy({ email_address: email });
	}

	async findByMobileNumber(mobile: string): Promise<UserEntity | null> {
		return this.repository.findOneBy({
			mobile_number: this.utils.phoneFormat(mobile),
		});
	}

	getInactiveUsers(): Promise<UserEntity[]> {
		return this.repository.getInactiveUsers();
	}

	// async registerOAuthUser(oauthUser: any): Promise<UserEntity> {
	// 	const { id, email, name } = oauthUser;
	// 	const user: OAuthUser = {
	// 		provider: 'google',
	// 		providerId: id,
	// 		email_address: email,
	// 		first_name: name?.familyName,
	// 		last_name: name.givenName,
	// 		role: Role.EMPLOYEE,
	// 	};

	// 	const createdUser: any = this.repository.create(user);
	// 	return this.repository.save(createdUser);
	// }
}
