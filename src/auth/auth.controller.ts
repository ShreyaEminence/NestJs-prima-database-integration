
import { AuthService } from '@auth/auth.service';
import { userPayload } from '@src/interfaces/users';
import { SignupDto } from '@auth/dto/auth.dto';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
  @Post('login')
  async login(@Body() body: {email: string; password: string }) {
    const user: userPayload | null = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
