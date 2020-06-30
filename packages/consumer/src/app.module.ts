import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot(), TodoModule],
})
export class AppModule {}
