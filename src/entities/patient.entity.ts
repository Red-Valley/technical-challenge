import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { Provider } from './provider.entity';
import { Status } from './status.entity';
import { StatusHistory } from './status-history.entity';

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

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => StatusHistory, statusHistory => statusHistory.patient)
  statusHistory: StatusHistory[];
}
