import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserProfileEntity } from './../../../model/user.profile.entity';
import { CustomRepository } from './../../../../libs/repository/typeorm-ex.decorator';

@Injectable()
@CustomRepository(UserProfileEntity)
export class UserProfileRepository extends Repository<UserProfileEntity> {}
