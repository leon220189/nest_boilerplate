import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../libs/abstract.entity';

@Entity({ name: 'UserRoles' })
export class UserRoleEntity extends AbstractEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	role_id: number;

	constructor(partial: Partial<UserRoleEntity>) {
		super();
		Object.assign(this, partial);
	}
}
