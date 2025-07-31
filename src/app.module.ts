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
import { ExceptionController } from './exception/exception.controller';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ! This tells TypeScript: “I’m sure it's not undefined.”
    MongooseModule.forRoot(process.env.DATABASE_URL!),
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
    StudentModule,
    EmployeeModule,
  ],
  controllers: [
    AppController,
    PostsController,
    ExceptionController,
    DatabaseController,
  ],
  providers: [AppService, PrismaService, DatabaseService],
})
export class AppModule {}
