import { Module } from '@nestjs/common';

import { TypeOrmExModule } from './../../../../libs/repository/typeorm-ex.module';
import { UserProfileRepository } from './user.profile.repository';
import { UserProfileEntity } from './../../../model/user.profile.entity';
import { UserProfileService } from './user.profile.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([
			UserProfileEntity,
			UserProfileRepository,
		]),
	],
	providers: [UserProfileService],
	exports: [UserProfileService, TypeOrmExModule],
})
export class UserProfileModule {}
