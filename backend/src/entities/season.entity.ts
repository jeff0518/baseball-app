import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity('season')
@Unique(['code'])
export class Season {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  code: string; // CPBL-2025

  @Column('int')
  year: number; // 2025

  @Column('varchar', { length: 50 })
  type: string; // 'regular_season'

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
