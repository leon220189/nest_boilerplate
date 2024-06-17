import { AbstractEntity } from './../abstract.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { IBaseService } from './../interface/i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseAbstractService<
	T extends AbstractEntity,
	R extends Repository<T>,
> implements IBaseService<T>
{
	protected readonly repository: R;

	constructor(repository: R) {
		this.repository = repository;
	}
	public async index(fields?: FindManyOptions<T> | undefined): Promise<T[]> {
		return await this.repository.find(fields);
	}

	public async findOne(
		fields: FindOptionsWhere<T> | FindOptionsWhere<T>[],
	): Promise<T | null> {
		return this.repository.findOneBy(fields).then((entity) => {
			if (!entity) {
				return null;
			}
			return entity;
		});
	}

	public findById(id: any): Promise<T> {
		return this.repository.findOneBy({ id: id }).then((entity) => {
			if (!entity) {
				throw new Error(`Entity with id ${id} not found`);
			}
			return entity;
		});
	}

	public findByIds(ids: [EntityId]): Promise<T[]> {
		return this.repository.findByIds(ids);
	}

	// public create(fields: []): Promise<T | T[]> {
	// 	const _new_object: any = this.repository.create(fields);
	// 	return this.repository.save(_new_object);
	// }

	public async query(query: string, params?: any): Promise<T> {
		return await this.repository.query(query, params);
	}

	public async update(field: any, body: any): Promise<T> {
		await this.repository.update(field, body);
		return await this.repository.findOneOrFail({ where: field });
	}

	public async updateMany(fields: any, body: any): Promise<T[]> {
		if (!fields || !Object.entries(fields).length) {
			throw new Error(`Payload:::${fields} for updating is invalid`);
		}
		await this.repository.update(fields, body);
		return await this.repository.find({ where: { id: fields } });
	}

	public async delete(fields: any) {
		return await this.repository.delete(fields);
	}

	public save(data: any): Promise<T> {
		const _new_object: any = this.repository.create(data);
		return this.repository.save(_new_object);
	}

	public async count(fields: any): Promise<number> {
		return await this.repository.count(fields);
	}

	public async countBy(fields: any): Promise<number> {
		return await this.repository.count(fields);
	}
}
