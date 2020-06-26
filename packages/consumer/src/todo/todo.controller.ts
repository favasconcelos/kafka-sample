import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { inspect } from 'util';
import { TodoCreateDTO } from './todo-create.dto';

@Controller()
export class TodoController {
  @MessagePattern('todo.create')
  public createTodo(@Payload() incomingMessage: TodoCreateDTO, @Ctx() context: KafkaContext) {
    const topic = context.getTopic();
    const message = context.getMessage();
    console.log(inspect({ topic, message }));
    console.log(inspect(incomingMessage));
  }
}
