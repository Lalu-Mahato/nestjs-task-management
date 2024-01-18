import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ApiResponse } from '../common/common.types';
import { CommonFunctionsService } from '../common/common-functions.service';
import { TASK_NOT_FOUND } from '../constants/error-messages.constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/entities/user.entity';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private commonFunctionsService: CommonFunctionsService,
    private loggerService: LoggerService,
  ) {}

  async getAllTasks(user: User): Promise<ApiResponse<Task[]>> {
    const tasks = await this.tasksRepository.find({
      order: { updatedAt: 'DESC' },
      where: { user },
    });
    return this.commonFunctionsService.successResponse(tasks);
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<ApiResponse<Task>> {
    const id = this.commonFunctionsService.generateUniqueIntegerId();
    const newTask = this.tasksRepository.create({ ...createTaskDto, id, user });
    const savedTask = await this.tasksRepository.save(newTask);
    this.loggerService.log('New task created!');
    return this.commonFunctionsService.createdResponse(savedTask);
  }

  async getTaskById(id: number, user: User): Promise<ApiResponse<Task>> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return this.commonFunctionsService.successResponse(task);
  }

  async deleteTaskById(id: number, user: User): Promise<ApiResponse<Task>> {
    await this.getTaskById(id, user);
    await this.tasksRepository.delete(id);
    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }

  async updateTaskStatus(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<any> {
    const { status } = updateTaskStatusDto;
    const { data } = await this.getTaskById(id, user);
    data.status = status;
    const updatedTask = await this.tasksRepository.save(data);
    return this.commonFunctionsService.successResponse(updatedTask);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<any> {
    const { data } = await this.getTaskById(id, user);
    Object.keys(updateTaskDto).forEach((key) => {
      data[key] = updateTaskDto[key];
    });
    const savedTask = await this.tasksRepository.save(data);
    return this.commonFunctionsService.successResponse(savedTask);
  }
}
