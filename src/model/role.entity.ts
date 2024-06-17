import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../../libs/abstract.entity';

@Entity({ name: 'Roles' })
export class RoleEntity extends AbstractEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ default: null })
	parent_id: number;

	constructor(partial: Partial<RoleEntity>) {
		super();
		Object.assign(this, partial);
	}

	@BeforeInsert()
	@BeforeUpdate()
	replaceEmptyStringAsNull() {
		if (!this.parent_id) {
			this.parent_id = null as any;
		}
	}
}
