import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';


@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  specialty: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Un provider puede tener muchos pacientes
  @OneToMany('Patient', 'provider')
  patients: any[];
}