import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

export class TFAService {
	generateSecret(length = 20) {
		return speakeasy.generateSecret({ length: length });
	}

	generateQRCode(data: any) {
		return new Promise((resolve, reject) => {
			QRCode.toDataURL(speakeasy.otpauthURL(data), function (err, image_data) {
				if (err) return reject(err);
				return resolve(image_data);
			});
		});
	}

	generateQRCodeWithBrowserID(data: any) {
		return new Promise((resolve, reject) => {
			QRCode.toDataURL(data, function (err, image_data) {
				if (err) return reject(err);
				return resolve(image_data);
			});
		});
	}

	generateTOTP(secret: string) {
		return speakeasy.totp({
			secret: secret,
			encoding: 'ascii',
		});
	}

	verify(secret: string, opt: string) {
		return speakeasy.totp.verify({
			secret: secret,
			encoding: 'ascii',
			token: opt,
			window: 2,
		});
	}

	otpauthURL(data: any) {
		return speakeasy.otpauthURL(data);
	}
}
