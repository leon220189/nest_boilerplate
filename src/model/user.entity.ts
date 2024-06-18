import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { AbstractEntity } from '../../libs/abstract.entity';
import { UserStatus, Role } from '../../libs/enums';
import { UserProfileEntity } from './user.profile.entity';
import { UtilsService } from '../../libs/utils/util.service';

export type Provider = 'google' | 'cognito' | 'facebook';

@Entity({ name: 'Users' })
export class UserEntity extends AbstractEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 150, nullable: false, unique: true })
	email_address: string;

	@Column({ nullable: false })
	first_name: string;

	@Column({ nullable: false })
	last_name: string;

	@Exclude()
	@Column({ nullable: false })
	password: string;

	@Exclude()
	@Column({ type: 'varchar', length: 255, nullable: true })
	device_id: string;

	@Exclude()
	@Column({ type: 'varchar', length: 255, nullable: true })
	device_fcm_token: string;

	@Column({ type: 'varchar', length: 3, nullable: false })
	area_code: string;

	@Column({ type: 'varchar', length: 16, unique: true, nullable: false })
	mobile_number: string;

	@Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
	status: string;

	@Column({ default: true })
	is_verified: boolean;

	@Column({ type: 'enum', enum: Role, default: Role.EMPLOYEE })
	role: Role;

	@Exclude()
	@Column({ nullable: true })
	otp_key: string;

	@Exclude()
	@Column({ nullable: true })
	otp_number: string;

	@Exclude()
	@Column({ nullable: true })
	otp_requested_date: 'datetime';

	@Exclude()
	@Column({ default: 0 })
	otp_request_count: number;

	// @Exclude()
	// @Column({ nullable: true })
	// provider: Provider;

	// @Exclude()
	// @Column({ nullable: true })
	// providerId: string;

	@OneToOne(() => UserProfileEntity, (_userProfile) => _userProfile.id)
	@JoinColumn({ name: 'profile_id' })
	profile: UserProfileEntity;

	constructor(partial: Partial<UserEntity>) {
		super();
		Object.assign(this, partial);
	}

	@Expose()
	get full_name(): string {
		return `${this.first_name} ${this.last_name}`;
	}

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		const utils = new UtilsService();
		this.password = await utils.hashPassword(this.password);
	}
}
