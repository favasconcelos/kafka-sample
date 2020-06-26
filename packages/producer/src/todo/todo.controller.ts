import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoDTO } from './create-todo.dto';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('/')
  public createTodo(@Body() body: CreateTodoDTO) {
    return this.todoService.createTodo(body);
  }
}
