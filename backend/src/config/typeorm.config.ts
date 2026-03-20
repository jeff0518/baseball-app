import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BatterStats, PitcherStats, GameRecord } from '../entities';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'baseball_db',
  entities: [BatterStats, PitcherStats, GameRecord],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
};
