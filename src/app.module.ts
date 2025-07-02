import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { AuthModule } from '@src/auth/auth.module';
import { UserModule } from '@src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsController } from '@posts/posts.controller';
import { PostsModule } from '@posts/posts.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    UserModule,
    PostsModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
