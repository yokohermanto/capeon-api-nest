import { LoginAuthDto } from './dto/login-auth.dto';
import { BadRequestException } from '../utils/exceptions/bad-request.exception';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    if (registerAuthDto.password != registerAuthDto.passwordConfirmation)
      throw new BadRequestException('password confirmation do not match');

    const user = await this.UsersService.create(registerAuthDto as any);

    return user;
  }

  async generateToken(loginAuthDto: LoginAuthDto) {
    const user = await this.getAuthenticated(
      loginAuthDto.email,
      loginAuthDto.password,
    );

    const payload = {
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async getToken(LoginAuthDto: LoginAuthDto) {
    const token = await this.generateToken(LoginAuthDto);
    return token;
  }

  public async getAuthenticated(email: string, plainTextPassword: string) {
    try {
      const user = await this.UsersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('wrong credential provided');
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('wrong credential provided');
    }
  }
}
