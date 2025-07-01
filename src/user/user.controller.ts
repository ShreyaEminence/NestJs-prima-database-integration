import {
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  decodeToken(token: string): any {
    try {
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }
  @Get()
  fetchUserDetails(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.decodeToken(token || '');
    return this.userService.userById(decoded.id || '');
  }
  @Patch('update')
  async updateUser(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = this.decodeToken(token || '');
    const user = await this.userService.updateUserDetails(
      decoded.id,
      req.body,
    );
    if (user) {
      return user;
    } else {
      return new InternalServerErrorException(
        'Something went wrong while updating,Please Try Again!',
      );
    }
  }
}
