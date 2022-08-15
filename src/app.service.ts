import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getResponse(): object {
    return {
      message: 'welcome to CapeOn API',
      data: {
        app: 'api',
        ver: '1.0.0',
        env: {
          nest_env_check: process.env.NEST_ENV_CHECK || 'empty',
        },
        dev: ['@cacing69'],
      },
    };
  }
}
