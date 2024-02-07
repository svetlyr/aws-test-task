import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PlaylistTypes, UserDto } from './dto';

import jsondb from '../db/db.json';

@Injectable()
export class UserService {
  private db: UserDto[];

  constructor(private readonly configService: ConfigService) {
    this.db = JSON.parse(JSON.stringify(jsondb));
  }

  getPublicPlaylists = async (username: string) => {
    const requestedUser = this.db.find(
      (userInfo) => userInfo.name === username,
    );

    const playlists = requestedUser.playlists.filter(
      (playlist) => playlist.type === PlaylistTypes.public,
    );

    return playlists;
  };

  getPrivatePlaylists = async (username: string) => {
    const requestedUser = this.db.find(
      (userInfo) => userInfo.name === username,
    );

    const playlists = requestedUser.playlists.filter(
      (playlist) => playlist.type === PlaylistTypes.private,
    );

    return playlists;
  };
}
