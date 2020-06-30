import { Logger, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [Logger],
})
export class TodoModule {}
