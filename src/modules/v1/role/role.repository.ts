import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { RoleEntity } from './../../../model';
import { CustomRepository } from './../../../../libs/repository/typeorm-ex.decorator';

@Injectable()
@CustomRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
