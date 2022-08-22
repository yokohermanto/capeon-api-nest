import { codeMapping } from '../code-mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(error?: string, extra?: string) {
    super(
      {
        code: codeMapping.BAD_REQUEST,
        message: error || `bad request`,
        data: null,
        meta: null,
        extra: extra ? [extra] : null,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
