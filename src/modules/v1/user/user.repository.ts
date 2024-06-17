import { Repository } from 'typeorm';
import { UserEntity } from './../../../model';
import { CustomRepository } from './../../../../libs/repository/typeorm-ex.decorator';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
	getInactiveUsers(): Promise<UserEntity[]> {
		return this.createQueryBuilder()
			.where('status = :active', { active: false })
			.getMany();
	}
}
