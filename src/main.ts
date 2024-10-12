import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_KEYS, ENVIRONMENT } from './constant';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter, ResponseInterceptor } from './core/_interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(configService));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  if (process.env.NODE_ENV !== ENVIRONMENT.Production) {
    await app.listen(configService.get(CONFIG_KEYS.PORT));
    console.log(
      `✅ Application is 🏃‍♂️ on: ${await app.getUrl()} - ${configService.get(CONFIG_KEYS.NODE_ENV)}`,
    );
  }
}
bootstrap();
