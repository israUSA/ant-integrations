import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('query_logs')
export class QueryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;

  @Column({ nullable: true })
  serviceType: string;

  @CreateDateColumn()
  createAt: Date;
}
