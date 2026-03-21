import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { typeormConfig } from './config/typeorm.config';
import { PlayersModule } from './modules/players/players.module';
import { ScraperModule } from './modules/scraper/scraper.module';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forRoot(typeormConfig), PlayersModule, ScraperModule],
})
export class AppModule {}
