import { UserEntity } from './../../../../model';

export interface authReponse {
	access_token: string;
	refresh_token: string;
	csrf_token?: string;
	expires_after: number;
	user: UserEntity;
	message: string;
}
