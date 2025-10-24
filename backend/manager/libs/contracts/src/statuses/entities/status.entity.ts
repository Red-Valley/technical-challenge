import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('uuid', { nullable: true })
  parent_id: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;
}