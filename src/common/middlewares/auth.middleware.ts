import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token missing');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'mySecretKeyIsthis');
      // req.user = decoded;  --- need to fix for type issue
      next();
    } catch (err) {
      if (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
}
