import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CommonFunctionsService } from '../common/common-functions.service';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, CommonFunctionsService],
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, LoggerModule],
})
export class TasksModule {}
