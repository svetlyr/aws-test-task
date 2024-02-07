import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CognitoJwtVerifier } from 'aws-jwt-verify';

@Injectable()
export class JwtService {
  private verifier;

  constructor(private configService: ConfigService) {
    this.verifier = CognitoJwtVerifier.create({
      region: this.configService.get<string>('COGNITO_REGION'),
      userPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),

      // 'id' for ID token, 'access' for access tokens
      tokenUse: 'id',

      // Optional: to verify the audience (aud) claim
      clientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
    });
  }

  async verifyToken(idToken: string): Promise<any> {
    try {
      const payload = await this.verifier.verify(idToken);

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token failed verification');
    }
  }
}
