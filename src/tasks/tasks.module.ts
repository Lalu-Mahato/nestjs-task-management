import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CommonFunctionsService } from 'src/common/common-functions.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CommonFunctionsService],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
