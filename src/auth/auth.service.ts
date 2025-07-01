import { userPayload } from '@src/interfaces/users';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '@src/auth/dto/auth.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<userPayload | null> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!existingUser) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return null;

    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
  }

  async login(user: userPayload) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    const { password, ...rest } = user;
    return rest;
  }
}
