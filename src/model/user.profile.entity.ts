import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../../libs/abstract.entity';
import { Gender } from '../../libs/enums';
import { UserEntity } from './user.entity';

@Entity({ name: 'UserProfiles' })
export class UserProfileEntity extends AbstractEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	bank_branch: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	bank_name: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	bank_number: string;

	@Column({ nullable: true })
	birth_date: 'datetime';

	@Column({ type: 'varchar', length: 255, nullable: true })
	address: string;

	@Column({ type: 'enum', enum: Gender, default: Gender.MALE })
	gender: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	tax: string;

	@OneToOne(() => UserEntity, (_user) => _user.id)
	@JoinColumn({ name: 'user' })
	user: UserEntity;

	constructor(partial: Partial<UserProfileEntity>) {
		super();
		Object.assign(this, partial);
	}
}
