import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    // return this.authService.create(RegisterAuthDto);
  }

  @Post('login')
  async login(@Body() loginauthDto: LoginAuthDto) {
    // return this.authService.create(RegisterAuthDto);
  }
}
