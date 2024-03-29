import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getResponse(): object {
    return {
      message: 'welcome to CapeOn API',
      data: {
        app: 'api',
        ver: '1.0.0',
        env: {
          node_env: this.configService.get('NODE_ENV') || 'empty',
        },
        dev: ['@cacing69'],
      },
    };
  }
}
