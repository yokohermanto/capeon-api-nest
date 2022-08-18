import { errorMap } from './../utils/error.mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: errorMap.FORBIDDEN.FORBIDDEN_GENERAL,
        message: 'forbidden',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
