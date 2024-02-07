import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RequestWithUsername } from '../auth/dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse()
  @Get('publicPlaylists')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getPublicPlaylists(@Req() { username }: RequestWithUsername) {
    const playlists = await this.userService.getPublicPlaylists(username);

    return playlists;
  }

  @ApiOkResponse()
  @Get('privatePlaylists')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getPrivatePlaylists(@Req() { username }: RequestWithUsername) {
    const playlists = await this.userService.getPrivatePlaylists(username);

    return playlists;
  }
}
