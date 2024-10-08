import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_KEYS, ENVIRONMENT } from './constant';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  if (process.env.NODE_ENV !== ENVIRONMENT.Production) {
    await app.listen(configService.get(CONFIG_KEYS.PORT));
    console.log(
      `✅ Application is 🏃‍♂️ on: ${await app.getUrl()} - ${configService.get(CONFIG_KEYS.NODE_ENV)}`,
    );
  }
}
bootstrap();
