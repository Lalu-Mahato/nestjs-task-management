import { Entity, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { BaseEntity } from '../../base.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;
}
