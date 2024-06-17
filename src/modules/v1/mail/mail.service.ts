import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './../../../model';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(user: UserEntity, token: string) {
		await this.mailerService.sendMail({
			to: user.email_address,
			// from: '"Support Team" <support@example.com>', // override default from
			subject: 'OTP code send via email',
			template: './confirmation', // `.hbs` extension is appended automatically
			context: {
				// ✏️ filling curly brackets with content
				name: user.full_name,
				token,
			},
		});
	}
}
