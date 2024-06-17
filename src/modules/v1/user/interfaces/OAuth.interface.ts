import { Role } from './../../../../../libs/enums';

export interface OAuthUser {
	provider: string;
	providerId: number;
	email_address: string;
	first_name: string;
	last_name: string;
	role: Role;
	password: string;
}
