import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.DATABASE_HOST || 'localhost',
	port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
	username: process.env.DATABASE_USERNAME || 'leonle',
	password: process.env.DATABASE_PASSWORD || 'leonle',
	database: process.env.DATABASE_NAME || 'leonle_dev_db',
	entities: ['dist/**/*.entity.{ts,js}'],
	migrations: ['dist/migrations/*.{ts,js}', 'src/migrations/*.{ts,js}'],
	synchronize: false, // Disable automatic schema synchronization
	migrationsRun: true,
	logging: false,
	migrationsTableName: 'migrations',
};

export default config;
