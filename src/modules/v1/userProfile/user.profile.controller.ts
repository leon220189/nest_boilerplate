import { Controller, UseGuards } from '@nestjs/common';

import { UserProfileService } from './user.profile.service';
import { JwtAuthGuard } from './../../../guards/jwt-auth.guard';

@Controller('user-profile')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(private readonly userProfileService: UserProfileService) {}
}
