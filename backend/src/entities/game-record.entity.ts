import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_records')
export class GameRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  pitcherName: string;

  @Column('varchar')
  batterName: string;

  @Column('date')
  gameDate: Date;

  @Column('int')
  inning: number;

  @Column('varchar')
  result: string; // 1B, 2B, HR, SO, BB, FO

  @Column('boolean', { default: false })
  isHit: boolean;

  @Column('boolean', { default: true })
  isAB: boolean;

  @Column('int', { default: 0 })
  bases: number;

  @Column('int', { default: 0 })
  rbi: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
