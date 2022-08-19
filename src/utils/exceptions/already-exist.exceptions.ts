import { errorMap } from '../error.mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistException extends HttpException {
  constructor(field: string) {
    super(
      {
        code: errorMap.BAD_REQUEST.ALREADY_EXIST,
        message: `bad request, ${field} already exist`,
        data: null,
        meta: null,
        extra: null,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}