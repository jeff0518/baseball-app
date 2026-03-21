import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Team } from './team.entity';
import { Season } from './season.entity';

@Entity('team_standings_history')
@Index(['season_id', 'recorded_date'])
@Index(['team_id'])
export class TeamStandingsHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  season_id: string;

  @ManyToOne(() => Season, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  season: Season;

  @Column('varchar', { length: 10 })
  team_id: string;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column('int')
  rank: number;

  @Column('int')
  wins: number;

  @Column('int')
  losses: number;

  @Column('int')
  draws: number;

  @Column('decimal', { precision: 5, scale: 3 })
  winRate: number;

  @Column('decimal', { precision: 5, scale: 1 })
  gamesBehind: number;

  @Column('varchar', { length: 50 })
  streak: string;

  @Column('date')
  recorded_date: Date;

  @Column('timestamp')
  scrapedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
