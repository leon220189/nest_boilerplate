import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserRoleEntity } from './../../../model';
import { CustomRepository } from './../../../../libs/repository/typeorm-ex.decorator';

@Injectable()
@CustomRepository(UserRoleEntity)
export class UserRoleRepository extends Repository<UserRoleEntity> {}
