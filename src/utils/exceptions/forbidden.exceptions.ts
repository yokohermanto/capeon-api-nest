import { errorMap } from '../error.mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        code: errorMap.FORBIDDEN.FORBIDDEN_GENERAL,
        message: 'forbidden',
        data: null,
        meta: null,
        extra: null,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
