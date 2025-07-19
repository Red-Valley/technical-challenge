import { StatusHistory } from '../status-history/status-history.entity';
import { Status } from '../statuses/status.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @Column({ name: 'status_id' })
  statusId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relaciones
  @ManyToOne('Provider', 'patients')
  @JoinColumn({ name: 'provider_id' })
  provider: any;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => StatusHistory, (statusHistory) => statusHistory.patient)
  statusHistory: StatusHistory[];
}