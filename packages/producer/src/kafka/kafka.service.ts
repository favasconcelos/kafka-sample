import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;
  private topic: string;

  constructor(private configService: ConfigService) {
    const broker = this.configService.get('KAFKA_BROKER');
    const clientId = this.configService.get('KAFKA_CLIENT_ID');
    const topic = this.configService.get('KAFKA_TOPIC');

    const kafka = new Kafka({
      brokers: [broker],
      clientId: clientId,
    });

    this.topic = topic;
    this.producer = kafka.producer({
      retry: {
        retries: 3,
      },
    });
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  public async send(value: any, key?: string) {
    const topic = this.topic;
    const messages = [{ key, value }];
    return await this.producer.send({ topic, messages });
  }
}
