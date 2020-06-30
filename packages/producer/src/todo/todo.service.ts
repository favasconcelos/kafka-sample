import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { CreateTodoDTO } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@Inject(Logger) private readonly logger: LoggerService, private kafkaService: KafkaService) {}

  public async createTodo(body: CreateTodoDTO) {
    const response = await this.kafkaService.send(body, 'todo.create');
    this.logger.log(response);
    return response;
  }
}
