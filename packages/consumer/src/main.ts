import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  // TODO: Load the configuration from KAFKA from an env variable (clientId, broker and groupId)
  const app = await NestFactory.createMicroservice<KafkaOptions>(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
        }),
      ],
    }),
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'todo',
        brokers: ['kafka-service:9092'],
      },
      consumer: {
        groupId: 'todo-consumer',
      },
    },
  });
  await app.listenAsync();
}

bootstrap();
