import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      key: 'value',
      msg: 'Hello World!',
    };
  }
}
