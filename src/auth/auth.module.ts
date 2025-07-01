import { jwtConstants } from '@src/constants';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
