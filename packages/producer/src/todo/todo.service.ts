import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { CreateTodoDTO } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private kafkaService: KafkaService) {}

  public async createTodo(body: CreateTodoDTO) {
    return this.kafkaService.send(body);
  }
}
