import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import {
  ApiResponse,
  successResponse,
  createdResponse,
} from '../common/common.types';
import { TASK_NOT_FOUND } from '../constants/error-messages.constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<ApiResponse<Task[]>> {
    const tasks = await this.tasksRepository.find();
    return successResponse(tasks);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ApiResponse<Task>> {
    const newTask = this.tasksRepository.create(createTaskDto);
    const savedTask = await this.tasksRepository.save(newTask);
    return createdResponse(savedTask);
  }

  async getTaskById(id: number): Promise<ApiResponse<Task>> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return successResponse(task);
  }

  async deleteTaskById(id: number): Promise<ApiResponse<Task>> {
    await this.getTaskById(id);
    await this.tasksRepository.delete(id);
    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }

  async updateTaskStatus(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<any> {
    const { status } = updateTaskStatusDto;
    const { data } = await this.getTaskById(id);
    data.status = status;
    const updatedTask = await this.tasksRepository.save(data);
    return successResponse(updatedTask);
  }
}
