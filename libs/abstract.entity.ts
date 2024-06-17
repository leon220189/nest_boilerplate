'use strict';

import {
	BeforeInsert,
	BeforeUpdate,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { classToPlain } from 'class-transformer';

export abstract class AbstractEntity {
	@PrimaryColumn({ readonly: true })
	@PrimaryGeneratedColumn()
	@Index({ unique: true })
	id: number;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@BeforeInsert()
	setDefaultValues(): void {
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	updateTimestamps(): void {
		this.updatedAt = new Date();
	}

	toJSON() {
		return classToPlain(this);
	}
}
