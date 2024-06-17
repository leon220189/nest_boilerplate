/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { RolesService } from './../role/role.service';
import { UserService } from './user.service';
import { UtilsService } from './../../../../libs/utils/util.service';
import { UserRolesService } from './../role/user.role.service';

import { UserRepository } from './user.repository';
import { RoleRepository } from './../role/role.repository';
import { UserRoleRepository } from './../role/user.role.repository';

describe('UserService', () => {
	let service: UserService;
	let entityManager: EntityManager;
	let rolesService: RolesService;
	let utilsService: UtilsService;
	let userRolesService: UserRolesService;

	let repository: UserRepository;
	let userRoleRepository: UserRoleRepository;
	let roleRepository: RoleRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				UserRepository,
				EntityManager,
				RolesService,
				UtilsService,
				UserRolesService,
				UserRoleRepository,
				RoleRepository,
			],
		}).compile();

		service = module.get<UserService>(UserService);
		repository = module.get<UserRepository>(UserRepository);
		entityManager = module.get<EntityManager>(EntityManager);
		rolesService = module.get<RolesService>(RolesService);
		utilsService = module.get<UtilsService>(UtilsService);
		userRolesService = module.get<UserRolesService>(UserRolesService);
		userRoleRepository = module.get<UserRoleRepository>(UserRoleRepository);
		roleRepository = module.get<RoleRepository>(RoleRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('UserService should be defined', () => {
		expect(service).toBeDefined();
	});
});
