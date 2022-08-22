import { ConfigService } from '@nestjs/config';
// import { LocalAuthenticationGuard } from './../utils/guards/local-authentication.guard';
import { baseResponse, baseResponseRead } from './../utils/helpers';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/utils/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const message = 'register success';
    return baseResponse(await this.authService.register(registerAuthDto), {
      message,
    });
  }

  @Public()
  @Post('login')
  // @UseGuards(LocalAuthenticationGuard)
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const message = 'login success';

    const getToken = await this.authService.getToken(loginAuthDto);

    // return cookie;
    // console.debug(response.headers, cookie);

    response.setHeader(
      'Set-Cookie',
      `Authentication=${getToken}; HttpOnly; Path=/; Max-Age=${await this.configService.get(
        'JWT_EXPIRATION_TIME',
      )}`,
    );

    return response.send(
      baseResponse({ accessToken: getToken, refreshToken: null }, { message }),
    );
  }

  @Public()
  @Post('logout')
  async logOut(@Res() response: Response) {
    const message = 'logout success';

    response.setHeader(
      'Set-Cookie',
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
    );
    return response.send(baseResponse(null, { message }));
  }

  @Get('check')
  async check(@Req() request) {
    return baseResponseRead(request?.user);
  }
}
