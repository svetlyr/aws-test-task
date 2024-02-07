import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthenticateUserDto, RegisterUserDto } from './dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerRequest: RegisterUserDto) {
    try {
      return await this.authService.register(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() authenticateRequest: AuthenticateUserDto) {
    try {
      return await this.authService.login(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm/:id')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @ApiProperty({ example: 'JohnDoe' })
  async confirm(@Param('id') id: string) {
    try {
      return await this.authService.confirmUser(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
