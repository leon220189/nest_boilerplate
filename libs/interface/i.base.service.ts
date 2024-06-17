import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult, FindManyOptions, FindOptionsWhere } from 'typeorm';

export interface IBaseService<T> {
	index(condition: FindManyOptions<T> | undefined): Promise<T[]>;

	findOne(condition: FindOptionsWhere<T>): Promise<T | null>;

	findById(id: EntityId): Promise<T>;

	findByIds(id: [EntityId]): Promise<T[]>;

	// create(fields: T[]): Promise<T[] | T>;

	delete(fields: any): Promise<DeleteResult>;

	query(query: string, params?: any): Promise<T>;

	update(id: FindOptionsWhere<T>, body: any): Promise<T[] | T>;

	updateMany(fields: T | T[], body: any): Promise<T[]>;

	save(_entity: T): Promise<T>;

	count(fields: T[]): Promise<number>;

	countBy(fields: T[]): Promise<number>;
}
