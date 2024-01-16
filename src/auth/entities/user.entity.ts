import { BaseEntity } from 'src/base.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
