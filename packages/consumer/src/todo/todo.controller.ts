import { Controller, Inject, Logger, LoggerService } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TodoController {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  // TODO: Check if it's possible to auto convert the message to the correct type
  @MessagePattern('todo')
  public createTodo(@Payload() message: any) {
    const { key, value } = message;
    this.logger.log({ key, value });
  }
}
