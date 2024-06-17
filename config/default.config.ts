export const defaultConfig = {
	DATABASE_HOST: process.env.DATABASE_HOST,
	DATABASE_PORT: parseInt(
		process.env.DATABASE_PORT ? process.env.DATABASE_PORT : '5432',
		10,
	),
	DATABASE_URL: process.env.DATABASE_URL,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME,
	BCRYPT_SALT: parseInt(
		process.env.BCRYPT_SALT ? process.env.BCRYPT_SALT : '10',
		10,
	),
	minPasswordLength: 8,
	maxPasswordLength: 24,
	API_PREFIX: process.env.API_PREFIX,

	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
	ACCESS_TOKEN_EXPIRE_TIME: process.env.ACCESS_TOKEN_EXPIRE_TIME,
	REFRESH_TOKEN_EXPIRE_TIME: process.env.REFRESH_TOKEN_EXPIRE_TIME,
};
