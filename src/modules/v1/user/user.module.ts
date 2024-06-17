import { Module } from '@nestjs/common';

// Module
import { TypeOrmExModule } from './../../../../libs/repository/typeorm-ex.module';
import { UserProfileModule } from './../userProfile/user.profile.module';
import { RolesModule } from './../role/role.module';
import { UtilsModule } from './../../../../libs/utils/util.module';

// Controller
import { UserController } from './user.controller';

// Service
import { UserService } from './user.service';

// Repository
import { UserRepository } from './user.repository';
import { UserProfileRepository } from './../userProfile/user.profile.repository';

// Entity
import { UserEntity, UserProfileEntity } from './../../../model';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([
			UserEntity,
			UserRepository,
			UserProfileEntity,
			UserProfileRepository,
		]),
		UserProfileModule,
		UtilsModule,
		RolesModule,
	],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService, TypeOrmExModule],
})
export class UserModule {}
