import { codeMapping } from '../code-mapping';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UuidPipe implements PipeTransform<number, number> {
  transform(value: number, metadata: ArgumentMetadata) {
    if (this.checkIfValidUUID(value)) {
      return value;
    }

    throw new HttpException(
      {
        statusCode: codeMapping.INVALID_UUID,
        message: 'bad request, invalid uuid',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  private checkIfValidUUID(str) {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
  }
}
