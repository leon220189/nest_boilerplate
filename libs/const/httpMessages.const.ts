import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpErrors {
	constructor(private config: ConfigService) {}

	getErrors(): any {
		return {
			/**
			 * Notice: if ever adding l10n to messages, please do not translate text between `ticks`
			 */

			'_HTTP_errors_::_400': {},

			Generic: { code: 400000, message: 'Generic Error', status: 400 },

			_Generic_errors: {},

			CachingError: {
				code: 400001,
				message: 'The caching strategy is not recognized',
				status: 400,
			},
			LimitStrategyNotSupported: {
				code: 400002,
				message: 'The limit strategy is not supported',
				status: 400,
			},
			LimitTypeNotSupported: {
				code: 400003,
				message: 'The limit type is not supported',
				status: 400,
			},
			QueryParamsNotValid: {
				code: 400004,
				message: 'The query params are not valid',
				status: 400,
			},
			URLParamsNotValid: {
				code: 400005,
				message: 'The URL params are not valid',
				status: 400,
			},
			CorsOriginNotAllowed: {
				code: 400006,
				message: '`{0}` is not a valid origin',
				status: 400,
			},

			_Payload: {},

			InvalidHeader: {
				code: 400020,
				message: 'Header is not valid',
				status: 400,
			},
			InvalidPayload: {
				code: 400021,
				message: 'Payload is not valid',
				status: 400,
			},
			BodyValidation: {
				code: 400022,
				message: 'Payload validation has failed',
				status: 400,
			},
			IncorrectHeaders: {
				code: 400023,
				message: 'Headers are not correct',
				status: 400,
			},
			MissingHeaders: {
				code: 400024,
				message: 'Headers are missing',
				status: 400,
			},
			MissingPayload: {
				code: 400025,
				message: 'Payload is missing or empty',
				status: 400,
			},
			HashMismatch: {
				code: 400026,
				message: "Hash in the url doesn't match the hash value in the body",
				status: 400,
			},
			InvalidOffset: {
				code: 400027,
				message: 'Offset should be a positive integer',
				status: 400,
			},
			InvalidLimit: {
				code: 400028,
				message: `Limit should be a positive integer less than ${this.config.get(
					'PAGINATION_LIMIT',
				)}`,
				status: 400,
			},
			RescanSanitized: {
				code: 400029,
				message: 'Rescan is not available for sanitized files',
				status: 400,
			},
			RescanNotAvailable: {
				code: 400030,
				message: 'Rescan is not available',
				status: 400,
			},
			Duplicate: {
				code: 400031,
				message: 'Resource already exists',
				status: 400,
			},
			DuplicateDatabase: {
				code: 23505,
				message: 'Resource already exists in Database',
				status: 400,
			},
			FileTypeCannotBeDetermined: {
				code: 400032,
				message: 'Uploaded file type cannot be determined',
				status: 400,
			},
			InvalidPage: {
				code: 400033,
				message: 'Page should be a positive integer and less than {0}',
				status: 400,
			},

			_Routing_errors: {},

			PathNotValid: {
				code: 400040,
				message: 'The requested path is not valid',
				status: 400,
			},
			VersionRequired: {
				code: 400041,
				message: 'The version is required',
				status: 400,
			},
			VersionMissing: {
				code: 400042,
				message: 'The version does not exist',
				status: 400,
			},
			PathMissing: {
				code: 400043,
				message: 'The requested path does not exist',
				status: 400,
			},
			MethodMissing: {
				code: 400044,
				message: 'Method does not exist',
				status: 400,
			},
			RouteMisconfiguration: {
				code: 400045,
				message: 'The route was not properly setup',
				status: 400,
			},
			RouteMissing: {
				code: 400046,
				message: 'The requested route does not exist',
				status: 400,
			},
			DevelopmentRoute: {
				code: 400047,
				message: 'This route is available only on development environments',
				status: 400,
			},
			DeactivatedRoute: {
				code: 400048,
				message: 'This route is deactivated',
				status: 400,
			},

			_Hash_errors: {},

			HashMissing: {
				code: 400060,
				message: 'The `hash` field in body is required',
				status: 400,
			},
			HashInvalid: {
				code: 400061,
				message: 'The `hash` field is not an array',
				status: 400,
			},
			HashEmpty: {
				code: 400062,
				message: 'The `hash` field is empty',
				status: 400,
			},
			HashMaximum: {
				code: 400063,
				message: 'Exceeded maximum allowed',
				status: 400,
			},
			HashValueInvalid: {
				code: 400064,
				message: 'The hash value is not valid',
				status: 400,
			},
			IncludeDetailsInvalid: {
				code: 400065,
				message: 'The header `{0}` has to be either 0 or 1',
				status: 400,
			},
			FileMetadataInvalid: {
				code: 400066,
				message: 'The header `{0}` has to be either 0 or 1',
				status: 400,
			},
			HashUpdateFailed: {
				code: 400067,
				message: 'Hash update failed',
				status: 400,
			},

			_Top_hash_URL_errors: {},

			UrlParamTopAmount: {
				code: 400080,
				message: 'Limit must be positive',
				status: 400,
			},
			UrlParamTopType: {
				code: 400081,
				message: 'Type must be one of `clean` / `infected`',
				status: 400,
			},
			UrlParamTopPeriod: {
				code: 400082,
				message: 'Period must be one of `day` / `week` / `month`',
				status: 400,
			},
			UrlParamTopThreshold: {
				code: 400083,
				message: 'Threshold must be one of 1, 2, 3, 4, 5, 6',
				status: 400,
			},

			_App_info: {},

			OSRequiredFields: {
				code: 400100,
				message: 'The field `device_info.os_info.device_identity` is required',
				status: 400,
			},
			FileRequiredFields: {
				code: 400101,
				message:
					'The fields `application_info`, `file_info.sha1`, `file_info.file_property.file_location`, `file_info.file_property.file_name` are required',
				status: 400,
			},
			FailedToSaveAppinfo: {
				code: 400102,
				message: 'Failed to save appinfo. Please try again later.',
				status: 400,
			},

			_Top_detection_errors: {},

			HeaderExcludeInvalid: {
				code: 400120,
				message: 'The header `x-exclude-empty-file-id` has to be either 0 or 1',
				status: 400,
			},
			HeaderExcludeDataInvalid: {
				code: 400121,
				message: 'The header `x-exclude-data` has to be either 0 or 1',
				status: 400,
			},
			HeaderThresholdInvalid: {
				code: 400122,
				message: 'The header `x-threshold` must be one of 1, 2, 3, 4, 5, 6',
				status: 400,
			},
			UrlParamHashesInvalid: {
				code: 400124,
				message: 'Number of hashes must be one of 10, 100, 1000, 10000 ',
				status: 400,
			},

			_Upload_errors: {},

			S3UploadFailed: {
				code: 400140,
				message: 'The file upload has failed.',
				status: 400,
			},
			HeaderForceScanInvalid: {
				code: 400141,
				message: 'The header `{0}` has to be either 0 or 1.',
				status: 400,
			},
			HeaderSampleSharingInvalid: {
				code: 400142,
				message: 'The header `{0}` has to be either 0, 1 or 2.',
				status: 400,
			},
			PrivateImpossibleNotPaidUser: {
				code: 400143,
				message: 'Private scanning not enabled for the provided API key.',
				status: 400,
			},
			ExceededMaximumFileSize: {
				code: 400144,
				message: 'Exceeded maximum file size allowed. Allowed maximum {0}MB.',
				status: 400,
			},
			BodyMissing: {
				code: 400145,
				message: 'Request body is empty. Please send a binary file.',
				status: 400,
			},
			InvalidDownloadUrl: {
				code: 400146,
				message: 'Provided download url is not valid or inaccessible: {0}',
				status: 400,
			},
			FileMissing: {
				code: 400147,
				message: 'Rescan Failed. Requested file is missing from our servers.',
				status: 400,
			},
			FileIsPrivate: {
				code: 400148,
				message: 'Requested file is a private one and cannot be rescanned.',
				status: 400,
			},
			CountUpdateFailed: {
				code: 400149,
				message: 'Could not update the rescan count.',
				status: 400,
			},
			FilesIdsMissing: {
				code: 400150,
				message: 'The `file_ids` field array in body is required',
				status: 400,
			},
			FilesIdsInvalid: {
				code: 400151,
				message: 'The `file_ids` field is not an array',
				status: 400,
			},
			FilesIdsEmpty: {
				code: 400152,
				message: 'The `file_ids` field is empty',
				status: 400,
			},
			BulkRescanMaximum: {
				code: 400153,
				message: 'Exceeded maximum allowed',
				status: 400,
			},
			ArchiveFileLimitMaximum: {
				code: 400154,
				message:
					'Exceeded maximum allowed files in archive. Allowed maximum {0} files.',
				status: 400,
			},
			RedirectNotSupported: {
				code: 400155,
				message: 'Redirect urls are not supported',
				status: 400,
			},
			WorkflowRuleNotAllowed: {
				code: 400156,
				message: 'Workflow rule not available for your account',
				status: 400,
			},
			TheApikeyIsNotAuthorizedToPerformPublicScans: {
				code: 400157,
				message: 'The apikey is not authorized to perform public scans.',
				status: 400,
			},
			HeaderPrivateProcessingInvalid: {
				code: 400158,
				message: 'The header `{0}` has to be either 0, 1',
				status: 400,
			},
			PrivateImpossibleToScheduleRecans: {
				code: 400159,
				message: 'Cannot schedule rescans when private scanning is enabled.',
				status: 400,
			},
			GenerateEncryptionKeyFailed: {
				code: 400302,
				message: 'Could not generate the encryption key',
				status: 400,
			},
			HeaderScanWithInvalid: {
				code: 400141,
				message: 'The header `{0}` has to be either mdcore or mdaas.',
				status: 400,
			},

			_API_key: {},

			ApikeyAlreadyExists: {
				code: 400160,
				message: 'The apikey you are trying to add already exists',
				status: 400,
			},
			ApikeyNotRemoved: {
				code: 400161,
				message: 'The apikey could not be removed',
				status: 400,
			},
			ApikeyNotUpdated: {
				code: 400162,
				message: 'The apikey was not updated',
				status: 400,
			},
			ApikeyInvalidBody: {
				code: 400163,
				message: 'The body is invalid',
				status: 400,
			},
			NicknameTooLong: {
				code: 400164,
				message: 'Please choose another nickname, as this one is too long',
				status: 400,
			},
			ApikeyNotSpecified: {
				code: 400165,
				message: 'No apikey specified',
				status: 400,
			},
			InvalidEmail: {
				code: 400166,
				message: 'Please provide a valid email address',
				status: 400,
			},
			InvalidEmailHeaders: {
				code: 400167,
				message: 'Please provide a valid body',
				status: 400,
			},
			NicknameContainsProfanities: {
				code: 400168,
				message:
					'Please choose another nickname, as this one contains profanities',
				status: 400,
			},
			VulnerabilityFileTypeInvalid: {
				code: 400169,
				message: 'File type not allowed for vulnerability submission',
				status: 400,
			},
			NicknameInvalidFormat: {
				code: 400300,
				message:
					'Please choose another nickname, as this one contains invalid characters',
				status: 400,
			},
			PublicKeyInvalidFormat: {
				code: 400301,
				message: 'RSA Public key format is invalid',
				status: 400,
			},

			_User_reputation: {},

			UserReputationNotUpdated: {
				code: 400170,
				message: "The user's reputation could not been updated",
				status: 400,
			},

			_CIF_errors: {},

			InvalidInputFormatError: {
				code: 400180,
				message: 'Invalid format of input. Provide IPv4 or IPv6',
				status: 400,
			},
			FieldMissing: {
				code: 400181,
				message: 'The `address` field in body is required',
				status: 400,
			},
			FieldInvalid: {
				code: 400182,
				message: 'The `address` field is not an array',
				status: 400,
			},
			FieldEmpty: {
				code: 400183,
				message: 'The `address` field is empty',
				status: 400,
			},
			ArrayMaximum: {
				code: 400184,
				message: 'Exceeded maximum allowed',
				status: 400,
			},
			NonRoutableIp: {
				code: 400185,
				message: 'The address is a not routable IP',
				status: 400,
			},
			CifEmptyResponse: { code: 400186, message: 'No response', status: 400 },
			InvalidResponse: {
				code: 400187,
				message: 'Invalid response',
				status: 400,
			},

			_Stats: {},

			InvalidDays: {
				code: 400200,
				message: 'The number of days requested must be a positive integer',
				status: 400,
			},
			InvalidObjectId: {
				code: 400201,
				message: 'Invalid objectId',
				status: 400,
			},
			InvalidDate: { code: 400202, message: 'Invalid date', status: 400 },
			InvalidOutbreakReportFilter: {
				code: 400203,
				message: 'Invalid outbreak report filter',
				status: 400,
			},

			_Status: {},

			StatusParamType: {
				code: 400210,
				message:
					'Param type must be one of `prevention_api` / `reputation_api` / `feed_api`',
				status: 400,
			},

			_Coupons: {},

			CouponNotFound: { code: 400220, message: 'Code not found', status: 400 },
			CouponInactive: {
				code: 400221,
				message: 'Code is inactive',
				status: 400,
			},
			CouponPromotionEnded: {
				code: 400222,
				message: 'This promotion has ended',
				status: 400,
			},
			CouponNotUpdated: {
				code: 400223,
				message: 'Coupon update failed',
				status: 400,
			},
			CouponAlreadyUsed: {
				code: 400224,
				message: 'Coupon already used',
				status: 400,
			},
			CouponActive: {
				code: 400225,
				message: 'User already has an active coupon',
				status: 400,
			},
			CouponPaidApikey: {
				code: 400226,
				message: 'Can not activate a coupon on a paid apikey',
				status: 400,
			},

			_Repo: {},

			InvalidSource: {
				code: 400240,
				message: 'Invalid `source` value',
				status: 400,
			},
			InvalidRepository: {
				code: 400241,
				message: 'Invalid repository',
				status: 400,
			},

			_Salesforce: {},

			SalesforceConnectionError: {
				code: 400250,
				message: 'Salesforce connectivity error',
				status: 400,
			},
			SalesforceBadError: {
				code: 400251,
				message: 'There is no record',
				status: 400,
			},

			_Feed: {},

			DateTooOld: {
				code: 400260,
				message: `You are allowed to query up to ${this.config.get(
					'FEED_SETTINGS.maxDaysAllowed',
				)} days in the past`,
				status: 400,
			},

			_Cognito: {},

			AppClientNameRequired: {
				code: 400262,
				message: 'App client name not provided',
				status: 400,
			},
			AppClientIdRequired: {
				code: 400263,
				message: 'App client id not provided',
				status: 400,
			},
			AppClientMaximumReached: {
				code: 400264,
				message: 'Maximum number of app clients reached',
				status: 400,
			},
			AppClientCreationFailed: {
				code: 400265,
				message: 'App client could not be created',
				status: 400,
			},
			AppClientEmpty: {
				code: 400266,
				message: 'No client ids associated with current customer',
				status: 400,
			},
			AppClientNotAssociated: {
				code: 400267,
				message: 'Client id is not associated with current customer',
				status: 400,
			},
			AppClientNoInfo: {
				code: 400268,
				message: 'Information about current app client could not be retrieved',
				status: 400,
			},
			AppClientNotRemoved: {
				code: 400269,
				message: 'App client could not be removed',
				status: 400,
			},

			_CONFIG: {},

			InvalidConfigDataEnvironment: {
				code: 400270,
				message: 'Invalid config environment',
				status: 400,
			},
			InvalidConfigVersion: {
				code: 400271,
				message: 'Invalid config version',
				status: 400,
			},
			InvalidConfigData: {
				code: 400272,
				message: 'Invalid config data',
				status: 400,
			},
			ConfigAlreadyExists: {
				code: 400273,
				message: 'The config you are trying to add already exists',
				status: 400,
			},
			ConfigNotFound: {
				code: 400274,
				message: 'Config not found',
				status: 400,
			},

			_IP: {},

			InvalidIP: {
				code: 400303,
				message: 'Invalid IP',
				type: 'ip2Geolocation',
				status: 400,
			},
			NotFoundIP: {
				code: 400304,
				message: 'IP location not found',
				type: 'ip2Geolocation',
				status: 400,
			},

			'_HTTP_errors_::_401': {},

			AuthenticationFailed: {
				code: 401000,
				message: 'Authentication has failed',
				status: 401,
			},
			AuthenticationInvalid: {
				code: 401001,
				message: 'Authentication strategy is invalid',
				status: 401,
			},
			AuthenticationNotImplemented: {
				code: 401002,
				message: 'Authentication strategy is not implemented',
				status: 401,
			},
			AuthenticationNotSupported: {
				code: 401003,
				message: 'Authorization strategy is not supported for this endpoint',
				status: 401,
			},
			ExpiredAuthToken: {
				code: 401004,
				message: 'Authentication token has expired',
				status: 401,
			},
			InvalidAuthToken: {
				code: 401005,
				message: 'Authentication token is invalid',
				status: 401,
			},
			InvalidApiKey: { code: 401006, message: 'Invalid API key', status: 401 },
			Unauthorized: {
				code: 401007,
				message: 'You are not authorized',
				status: 401,
			},
			UnauthorizedToDownload: {
				code: 401008,
				message: 'You are not authorized to download this file',
				status: 401,
			},
			ExpiredOAuthToken: {
				code: 401009,
				message: 'OAuth token has expired',
				status: 401,
			},
			InvalidOAuthToken: {
				code: 401010,
				message: 'OAuth token is invalid',
				status: 401,
			},
			ApikeyIsNotAllowedForNonMtls: {
				code: 401011,
				message: 'Apikey is not allowed for non-mTLS',
				status: 401,
			},
			InvalidCrsfToken: {
				code: 401012,
				message: 'CRSF token is invalid',
				status: 401,
			},
			NotFoundCrsfToken: {
				code: 401013,
				message: 'CRSF token not found',
				status: 401,
			},

			'_HTTP_errors_::_403': {},

			BlackListedEndpoint: {
				code: 403000,
				message: 'Access Forbidden',
				status: 403,
			},
			ForbiddenApiKey: {
				code: 403001,
				message: "Requested resource doesn't match your API key",
				status: 403,
			},
			IpBlocked: {
				code: 403002,
				message: 'Your ip is blocked because of abuse',
				status: 403,
			},
			InsufficientPrivileges: {
				code: 403003,
				message: 'Insufficient privileges',
				status: 403,
			},
			IPNotWhiteListed: {
				code: 403004,
				message: 'Your IP is not within the whitelisted IP range',
				status: 403,
			},

			'_HTTP_errors_::_404': {},

			EndpointNotFound: {
				code: 404000,
				message: 'Endpoint not found',
				status: 404,
			},
			NotFound: { code: 404001, message: 'Entity was not found', status: 404 },
			NoEntries: {
				code: 404002,
				message: 'There are no entries found',
				status: 404,
			},
			HashNotFound: {
				code: 404003,
				message: 'The hash was not found',
				status: 404,
			},
			DataIdNotFound: {
				code: 404004,
				message: 'The data_id was not found',
				status: 404,
			},
			HashWaInfoNotFound: {
				code: 404005,
				message: 'The hash information was not found',
				status: 404,
			},
			DateWaInfoNotFound: {
				code: 404006,
				message: 'There is no data for selected date',
				status: 404,
			},
			FileIdMissing: {
				code: 404007,
				message: 'Requested file id does not exist in our records',
				status: 404,
			},
			ApikeyNotFound: {
				code: 404008,
				message: 'The apikey was not found',
				status: 404,
			},
			CveNotFound: {
				code: 404009,
				message: 'Requested CVE does not exist in our records',
				status: 404,
			},
			WorkflowsNotFound: {
				code: 404017,
				message: 'The workflow was not found',
				status: 404,
			},
			EnginesNotFound: {
				code: 404018,
				message: 'The engine was not found',
				status: 404,
			},
			UnsupportedFileType: {
				code: 404010,
				message: 'Unsupported file type',
				status: 404,
			},
			DowloadRequestedFileIsPrivate: {
				code: 404011,
				message:
					'This hash was scanned as a private file and we do not store the file',
				status: 404,
			},
			FileWasArchived: {
				code: 404012,
				message: 'File was archived',
				status: 404,
			},
			DeprecatedVersion: {
				code: 404013,
				message:
					'This API version is no longer maintained. Please use V4 API https://onlinehelp.opswat.com/mdcloud/6._V4_API.html',
				status: 404,
			},
			SanitizedFileMissing: {
				code: 404014,
				message:
					'The sanitized version of this file does not exist in our records',
				status: 404,
			},
			AuthorizationHeaderNotFound: {
				code: 404015,
				message: 'The Authorization token is missing',
				status: 404,
			},
			WrongAuthrization: {
				code: 404016,
				message: 'The Basic token has wrong value',
				status: 404,
			},

			'_HTTP_errors_::_406': {},

			PayloadNotJson: {
				code: 406000,
				message: 'Content-Type header & payload has to be json',
				status: 406,
			},
			PayloadDataMissing: {
				code: 406001,
				message: 'Payload data missing or error',
				append: true,
				status: 406,
			},

			'_HTTP_errors_::_408': {},

			RequestTimeout: {
				code: 408000,
				message: `Request timeout. It has reached the ${
					this.config.get('REQUEST_TIMEOUT') / 1000
				} seconds limit`,
				status: 408,
			},

			'_HTTP_errors_::_429': {},

			RequestsLimitReach: {
				code: 429000,
				message:
					'Rate limit exceeded, retry after the limit is reset. Limit: {0} / {1}',
				status: 429,
			},
			RequestThrottled: {
				code: 429001,
				message:
					'Your request has been throttled, maximum requests per minute: {0} for {1} user',
				status: 429,
			},
			TooManyConnections: {
				code: 429002,
				message: 'Too many connections, try again later',
				status: 429,
			},

			'_HTTP_errors_::_500': {},

			ScanPermanentlyFailed: {
				code: 500000,
				message: 'Scan request has failed permanently.',
				status: 500,
			},
			GenericInternalServer: {
				code: 500001,
				message: 'Internal Server Error',
				status: 500,
			},

			'_HTTP_errors_::_503': {},

			ElasticacheRedisServerNotAccessible: {
				code: 503000,
				message: 'External service is not reachable',
				status: 503,
			},
			MongodbServerNotAccessible: {
				code: 503001,
				message: 'External service is not reachable',
				status: 503,
			},
			ServerNotAccessible: {
				code: 503002,
				message: 'Server is not accessible',
				status: 503,
			},
		};
	}

	getErrorResponse(error: string) {
		const errorObject = this.getErrors()[error];
		const errorPayload = new HttpException(
			{
				error: {
					code: errorObject.code,
					messages: [errorObject.message],
				},
				status: errorObject.status,
			},
			errorObject.status,
		);

		return errorPayload;
	}
}
