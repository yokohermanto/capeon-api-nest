import { errorMap } from '../error.mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(error?: any) {
    super(
      {
        code: errorMap.UNPROCESSABLE_ENTITY.INVALID,
        message: `there is an empty field. it can't be null`,
        data: null,
        meta: null,
        extra: error || null,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
