import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BatterStats, PitcherStats, GameRecord, Team, Season, TeamStanding, TeamStandingsHistory } from '../entities';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'baseball_db',
  entities: [BatterStats, PitcherStats, GameRecord, Team, Season, TeamStanding, TeamStandingsHistory],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
};
