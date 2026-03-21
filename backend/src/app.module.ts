import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatterStats, PitcherStats, GameRecord, Team, Season, TeamStanding, TeamStandingsHistory } from './entities';
import { ScraperModule } from './modules/scraper/scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'baseball_db',
      entities: [BatterStats, PitcherStats, GameRecord, Team, Season, TeamStanding, TeamStandingsHistory],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: false,
      dropSchema: false,
    }),
    ScraperModule,
  ],
})
export class AppModule {}
