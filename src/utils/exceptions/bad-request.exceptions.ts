import { codeMapping } from '../code-mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(error?: any) {
    super(
      {
        code: codeMapping.UNPROCESSABLE_ENTITY.VALIDATE_FAILED,
        message: `there is an empty field. it can't be null`,
        data: null,
        meta: null,
        extra: error || null,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
