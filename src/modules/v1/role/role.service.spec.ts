/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';

import { RolesService } from './../role/role.service';
import { UserRolesService } from './../role/user.role.service';

import { RoleRepository } from './../role/role.repository';
import { UserRoleRepository } from './../role/user.role.repository';

describe('RolesService', () => {
	let service: RolesService;
	let userRolesService: UserRolesService;

	let userRoleRepository: UserRoleRepository;
	let roleRepository: RoleRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RolesService,
				UserRolesService,
				UserRoleRepository,
				RoleRepository,
			],
		}).compile();
		service = module.get<RolesService>(RolesService);
		roleRepository = module.get<RoleRepository>(RoleRepository);

		userRolesService = module.get<UserRolesService>(UserRolesService);
		userRoleRepository = module.get<UserRoleRepository>(UserRoleRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('RolesService should be defined', () => {
		expect(service).toBeDefined();
	});
});
