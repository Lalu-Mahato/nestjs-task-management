import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';
export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: string;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
