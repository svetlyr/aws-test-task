import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '../auth/jwt/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
