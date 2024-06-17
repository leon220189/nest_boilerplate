import { merge } from 'lodash';
import { defaultConfig } from './default.config';

export const configuration = async () => {
	const environment = process.env.ENVIRONMENT || 'default';

	let envConfig;
	switch (environment) {
		case 'local':
			envConfig = (await import('./local.config')).configuration;
			break;
		case 'production':
			envConfig = (await import('./production.config')).configuration;
			break;
		default:
			envConfig = {};
	}

	return merge(defaultConfig, envConfig, process.env);
};
