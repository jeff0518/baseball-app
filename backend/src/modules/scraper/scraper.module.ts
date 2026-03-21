import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { TeamStanding, TeamStandingsHistory, Season, Team } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([TeamStanding, TeamStandingsHistory, Season, Team])],
  providers: [ScraperService],
  controllers: [ScraperController],
  exports: [ScraperService],
})
export class ScraperModule {}
