import { errorMap } from './../utils/error.mapping';
import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordNotFoundException extends HttpException {
  constructor() {
    super(
      {
        statusCode: errorMap.NOT_FOUND.RECORD_NOT_FOUND,
        message: 'record not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class RecordNotFoundToUpdateException extends HttpException {
  constructor() {
    super(
      {
        statusCode: errorMap.NOT_FOUND.UPDATE_NOT_FOUND,
        message: 'update failed, data not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class RecordNotFoundToDeleteException extends HttpException {
  constructor() {
    super(
      {
        statusCode: errorMap.NOT_FOUND.DELETE_NOT_FOUND,
        message: 'delete failed, data not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
