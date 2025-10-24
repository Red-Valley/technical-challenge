import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column('uuid')
  provider_id: string;

  @Column('uuid')
  status_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
