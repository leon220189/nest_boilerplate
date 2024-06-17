import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpErrors } from './httpMessages.const';

@Module({
	imports: [ConfigModule],
	exports: [HttpErrors],
	providers: [HttpErrors],
})
export class ConstModule {}
