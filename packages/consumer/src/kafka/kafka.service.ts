import { Injectable, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnApplicationBootstrap, OnModuleDestroy {
  private client: ClientKafka;
  private topic: String;

  constructor(private configService: ConfigService) {
    const broker = this.configService.get('KAFKA_BROKER');
    const clientId = this.configService.get('KAFKA_CLIENT_ID');

    this.topic = this.configService.get('KAFKA_TOPIC');
    this.client = new ClientKafka({
      client: {
        brokers: [broker],
        clientId,
      },
    });
  }

  async onApplicationBootstrap() {
    this.client.subscribeToResponseOf(this.topic);
    await this.client.connect();
  }

  async onModuleDestroy() {
    this.client.close();
  }
}
