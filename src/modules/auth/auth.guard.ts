import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from './jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();

    try {
      const token = this.extractTokenFromRequest(request);
      if (!token) {
        throw new UnauthorizedException('No authentication token provided');
      }

      const payload = await this.jwtService.verifyToken(token);

      request.username = payload['cognito:username'];

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  };

  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.split(' ')[1];
  }
}
