import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Status } from '../statuses/status.entity';

@Entity('status_history')
export class StatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id' })
  patientId: string;

  @Column({ name: 'status_id' })
  statusId: string;

  @Column({ name: 'changed_at' })
  changedAt: Date;

  // Relaciones
  @ManyToOne(() => Patient, (patient) => patient.statusHistory)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;
}