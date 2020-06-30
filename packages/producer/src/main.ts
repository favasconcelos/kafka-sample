import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
        }),
      ],
    }),
  });

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');
  await app.listen(port);
}

bootstrap();
