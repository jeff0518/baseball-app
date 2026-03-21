import { Controller, Get } from '@nestjs/common';
import { ScraperService, TeamStanding } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('cpbl-standings')
  async getCPBLStandings(): Promise<TeamStanding[]> {
    return await this.scraperService.scrapeTeamStandings();
  }
}
