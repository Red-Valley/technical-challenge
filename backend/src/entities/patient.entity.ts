import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Provider } from './provider.entity';
import { Status } from './status.entity';
import { StatusHistory } from './status-history.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'uuid', nullable: true })
  provider_id: string;

  @Column({ type: 'uuid', nullable: true })
  status_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relaciones
  @ManyToOne(() => Provider, provider => provider.patients, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => Status, status => status.patients, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => StatusHistory, history => history.patient, { onDelete: 'CASCADE' })
  statusHistories: StatusHistory[];
} 