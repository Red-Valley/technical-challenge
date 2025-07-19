import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string | null;

  @Column()
  order: number;

  // Relación consigo mismo - un status puede tener un padre
  @ManyToOne(() => Status, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Status | null;

  // Un status puede tener muchos hijos
  @OneToMany(() => Status, (status) => status.parent)
  children: Status[];
}