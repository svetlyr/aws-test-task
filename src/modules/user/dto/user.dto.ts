import { Expose, Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Allow, IsDefined, IsEnum, IsIn, IsString } from 'class-validator';

export const PlaylistTypes = {
  public: 'PUBLIC',
  private: 'PRIVATE',
} as const;

export type PlaylistType = (typeof PlaylistTypes)[keyof typeof PlaylistTypes];

export class UserDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'JohnDoe' })
  name: string;

  @Expose()
  @IsDefined()
  @Type(() => Array<PlaylistsDto>)
  @ApiProperty({ type: Array<PlaylistsDto>, isArray: true })
  playlists: Array<PlaylistsDto>;
}

export class PlaylistsDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'Chill Music' })
  name: string;

  @Expose()
  @IsEnum(PlaylistTypes)
  @IsIn(Object.values(PlaylistTypes))
  type: PlaylistType;

  @Allow()
  songs: Array<string>;
}
