import { Logger, Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [KafkaModule],
  controllers: [TodoController],
  providers: [TodoService, Logger],
})
export class TodoModule {}
