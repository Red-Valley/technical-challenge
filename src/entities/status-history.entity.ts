import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { Status } from './status.entity';

@Entity('status_history')
export class StatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @Column({ name: 'status_id' })
  statusId: string;

  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date;

  @ManyToOne(() => Patient, patient => patient.statusHistory)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Status, status => status.statusHistory)
  @JoinColumn({ name: 'status_id' })
  status: Status;
}
