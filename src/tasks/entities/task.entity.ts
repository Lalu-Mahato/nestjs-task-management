import { Entity, Column } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { BaseEntity } from 'src/base.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;
}
