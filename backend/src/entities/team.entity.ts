import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryColumn('varchar', { length: 10 })
  id: string; // BRO, RAK, UNI, FUB, TSG, WDR

  @Column('varchar', { length: 50 })
  name: string; // 中文名稱

  @Column('varchar', { length: 255 })
  logo_url: string; // /team_official/brothers_logo.png

  @Column('varchar', { length: 255 })
  avatar_url: string; // /team_avatar/caplogo-bothers.png

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
