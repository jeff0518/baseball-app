import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pitcher_stats')
export class PitcherStats {
  @PrimaryColumn('varchar')
  playerId: string;

  @Column('varchar')
  playerNumber: string;

  @Column('varchar')
  playerName: string;

  @Column('int', { default: 0 })
  IPOuts: number; // 出局數

  @Column('int', { default: 0 })
  BF: number; // 面對打席

  @Column('int', { default: 0 })
  H: number; // 被安打

  @Column('int', { default: 0 })
  HR: number; // 被全壘打

  @Column('int', { default: 0 })
  BB: number; // 四壞球

  @Column('int', { default: 0 })
  IBB: number; // 故意四壞

  @Column('int', { default: 0 })
  HB: number; // 觸身球

  @Column('int', { default: 0 })
  SO: number; // 三振

  @Column('int', { default: 0 })
  R: number; // 失分

  @Column('int', { default: 0 })
  ER: number; // 自責分

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
