import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { StatusHistory } from './status-history.entity';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relaciones
  @ManyToOne(() => Status, status => status.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Status;

  @OneToMany(() => Status, status => status.parent)
  children: Status[];

  @OneToMany(() => Patient, patient => patient.status, { onDelete: 'SET NULL' })
  patients: Patient[];

  @OneToMany(() => StatusHistory, history => history.status, { onDelete: 'CASCADE' })
  statusHistories: StatusHistory[];
} 