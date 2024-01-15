import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
