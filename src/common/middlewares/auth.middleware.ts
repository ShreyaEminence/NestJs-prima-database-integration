import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { userPayload } from '@src/interfaces/users';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
      const { id, name, email } = decoded;

      if (
        typeof id === 'string' &&
        typeof name === 'string' &&
        typeof email === 'string'
      ) {
        req.user = { id, name, email } as userPayload;
        next();
      } else {
        throw new UnauthorizedException('Invalid token payload');
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
