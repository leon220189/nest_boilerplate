import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../libs/database/snake-naming.strategy';

export const getOrmConfig = async (): Promise<TypeOrmModuleOptions> => {
	const environment = process.env.NODE_ENV || 'development';
	const configPath = `./ormconfig.${environment}`;
	const { default: dbConfig } = await import(configPath);

	return {
		...dbConfig,
		namingStrategy: new SnakeNamingStrategy(),
	};
};

export default getOrmConfig;
