import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApp(): object {
    return this.appService.getResponse();
  }

  @Get('error')
  getError(): object {
    throw new HttpException(
      {
        statusCode: 40301,
        message: 'This is a forbidden message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('validate')
  getValidate(): object {
    throw new HttpException(
      {
        statusCode: 42201,
        message: 'This is a validate message',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
