import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { StatusHistory } from './status-history.entity';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @Column()
  order: number;

  @ManyToOne(() => Status, status => status.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Status;

  @OneToMany(() => Status, status => status.parent)
  children: Status[];

  @OneToMany(() => Patient, patient => patient.status)
  patients: Patient[];

  @OneToMany(() => StatusHistory, statusHistory => statusHistory.status)
  statusHistory: StatusHistory[];
}
