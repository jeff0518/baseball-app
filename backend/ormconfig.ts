import { DataSource } from 'typeorm';
import { Team, Season, TeamStanding, TeamStandingsHistory, BatterStats, PitcherStats, GameRecord } from './src/entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'baseball_db',
  entities: [Team, Season, TeamStanding, TeamStandingsHistory, BatterStats, PitcherStats, GameRecord],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: false,
  dropSchema: false,
});
