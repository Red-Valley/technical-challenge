import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('status_history')
export class StatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  patient_id: string;

  @Column('uuid')
  status_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  changed_at: Date;
}
