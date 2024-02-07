import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class AuthenticateUserDto {
  @Expose()
  @ApiProperty({ example: 'JohnDoe' })
  name: string;

  @Expose()
  userId: string;

  @Expose()
  @ApiProperty({ example: 'Test123' })
  password: string;
}

export class RegisterUserDto {
  @IsString()
  @ApiProperty({ example: 'JohnDoe' })
  name: string;

  @IsString()
  @MinLength(6)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  @ApiProperty({ example: 'Test123' })
  password: string;
}

export interface RequestWithUsername extends Request {
  username: string;
}
