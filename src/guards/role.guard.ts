import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesService } from './../modules/v1/role/role.service';
import { UserEntity } from './../model';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly rolesService: RolesService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) return true;

		const request = context.switchToHttp().getRequest();
		const user: UserEntity = request.user;

		if (!user) return false;

		for (const role of roles) {
			if (await this.rolesService.hasRole(user.id, role)) return true;
		}
		return false;
	}
}
