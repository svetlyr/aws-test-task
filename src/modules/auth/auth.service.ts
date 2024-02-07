import { Injectable } from '@nestjs/common';

import { AuthenticateUserDto, RegisterUserDto } from './dto';
import { ConfigService } from '@nestjs/config';
import {
  AdminConfirmSignUpCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class AuthService {
  private clientId: string;
  private userPoolId: string;
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('COGNITO_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });
    this.clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
    this.userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID');
  }

  register = async ({ name, password }: RegisterUserDto) => {
    try {
      const response = await this.cognitoClient.send(
        new SignUpCommand({
          ClientId: this.clientId,
          Username: name,
          Password: password,
        }),
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async ({ name, password }: AuthenticateUserDto) => {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: name,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.cognitoClient.send(command);
      return {
        success: true,
        message: 'Login successful',
        data: response.AuthenticationResult,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  confirmUser = async (username: string) => {
    const command = new AdminConfirmSignUpCommand({
      UserPoolId: this.userPoolId,
      Username: username,
    });

    try {
      const response = await this.cognitoClient.send(command);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
