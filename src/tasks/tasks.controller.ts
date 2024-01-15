import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { ApiResponse } from '../common/common.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<ApiResponse<Task[]>> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<ApiResponse<Task>> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Task>> {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
