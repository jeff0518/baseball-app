import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('batter_stats')
export class BatterStats {
  @PrimaryColumn('varchar')
  playerId: string;

  @Column('varchar')
  playerNumber: string;

  @Column('varchar')
  playerName: string;

  @Column('int', { default: 0 })
  PA: number; // 打席

  @Column('int', { default: 0 })
  AB: number; // 打數

  @Column('int', { default: 0 })
  H: number; // 安打

  @Column('int', { default: 0 })
  '2B': number; // 二壘安打

  @Column('int', { default: 0 })
  '3B': number; // 三壘安打

  @Column('int', { default: 0 })
  HR: number; // 全壘打

  @Column('int', { default: 0 })
  R: number; // 得分

  @Column('int', { default: 0 })
  RBI: number; // 打點

  @Column('int', { default: 0 })
  BB: number; // 四壞球

  @Column('int', { default: 0 })
  IBB: number; // 故意四壞

  @Column('int', { default: 0 })
  HBP: number; // 觸身球

  @Column('int', { default: 0 })
  SO: number; // 三振

  @Column('int', { default: 0 })
  SH: number; // 犧牲觸擊

  @Column('int', { default: 0 })
  SF: number; // 犧牲飛球

  @Column('int', { default: 0 })
  E: number; // 失誤上壘

  @Column('int', { default: 0 })
  SB: number; // 盜壘成功

  @Column('int', { default: 0 })
  CS: number; // 盜壘失敗

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
