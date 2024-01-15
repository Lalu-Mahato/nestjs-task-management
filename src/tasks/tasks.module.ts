import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CommonFunctionsService } from 'src/common/common-functions.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CommonFunctionsService],
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
})
export class TasksModule {}
