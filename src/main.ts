import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CapeOn API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.13.2/swagger-ui.min.css',
    customJs:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.13.2/swagger-ui-bundle.min.js',
  });

  await app.listen(3000);
}
bootstrap();
