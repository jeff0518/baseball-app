import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamStanding, TeamStandingsHistory } from '../../entities';
import { StandingsMapper } from './dto/standings.mapper';
import { TeamStandingDTO, StandingsResponseDTO } from './dto/standings.dto';

@Controller('standings')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
    @InjectRepository(TeamStanding)
    private teamStandingRepository: Repository<TeamStanding>,
    @InjectRepository(TeamStandingsHistory)
    private teamStandingsHistoryRepository: Repository<TeamStandingsHistory>,
  ) {}

  @Get('current')
  async getCurrentStandings(): Promise<StandingsResponseDTO> {
    const standings = await this.teamStandingRepository.find({
      relations: ['team', 'season'],
      order: { rank: 'ASC' },
    });

    return {
      data: standings.map((s) => StandingsMapper.toDTO(s)),
      timestamp: new Date(),
      season: 'CPBL-2025',
    };
  }

  @Get('history')
  async getStandingsHistory(@Query('teamId') teamId?: string, @Query('limit') limit = 30) {
    const query = this.teamStandingsHistoryRepository
      .createQueryBuilder('h')
      .leftJoinAndSelect('h.team', 'team')
      .orderBy('h.recorded_date', 'DESC')
      .addOrderBy('h.rank', 'ASC')
      .limit(parseInt(limit as any) || 30);

    if (teamId) {
      query.where('h.team_id = :teamId', { teamId });
    }

    const history = await query.getMany();

    return {
      data: history.map((h) => ({
        rank: h.rank,
        teamId: h.team_id,
        teamName: h.team.name,
        wins: h.wins,
        losses: h.losses,
        draws: h.draws,
        winRate: `${(h.winRate * 100).toFixed(1)}%`,
        gamesBehind: h.gamesBehind === Math.floor(h.gamesBehind) ? h.gamesBehind.toFixed(0) : h.gamesBehind.toFixed(1),
        streak: h.streak,
        recordedDate: h.recorded_date,
        scrapedAt: h.scrapedAt,
      })),
      season: 'CPBL-2025',
    };
  }

  @Get('scrape-now')
  async scrapeNow() {
    await this.scraperService.scrapeAndSaveTeamStandings();
    return { message: 'Scrape completed', timestamp: new Date().toISOString() };
  }
}
