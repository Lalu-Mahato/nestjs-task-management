import { BaseEntity } from 'src/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
