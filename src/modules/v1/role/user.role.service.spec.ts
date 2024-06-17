/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';

import { UserRolesService } from './../role/user.role.service';

import { UserRoleRepository } from './../role/user.role.repository';

describe('RolesService', () => {
	let service: UserRolesService;

	let userRoleRepository: UserRoleRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserRolesService, UserRoleRepository],
		}).compile();
		service = module.get<UserRolesService>(UserRolesService);

		userRoleRepository = module.get<UserRoleRepository>(UserRoleRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('RolesService should be defined', () => {
		expect(service).toBeDefined();
	});
});
