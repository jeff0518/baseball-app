import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamStanding, TeamStandingsHistory, Team } from '../../entities';
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
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  @Get('current')
  async getCurrentStandings(@Query('period') period: string = 'regular_season'): Promise<any> {
    try {
      // 映射前端 period 到資料庫 season_type
      const seasonTypeMap = {
        full: 'regular_season',
        first: 'first_half',
        second: 'second_half',
      };
      const seasonType = seasonTypeMap[period as keyof typeof seasonTypeMap] || 'regular_season';

      const standings = await this.teamStandingRepository.find({
        where: { season_type: seasonType },
        order: { rank: 'ASC' },
      });
      
      const teams = await this.teamRepository.find();

      return {
        data: standings.map((s) => ({
          rank: s.rank,
          teamId: s.team_id,
          teamName: teams.find((t) => t.id === s.team_id)?.name || 'Unknown',
          wins: s.wins,
          losses: s.losses,
          draws: s.draws,
          winRate: `${(Number(s.winRate) * 100).toFixed(1)}%`,
          gamesBehind: Number(s.gamesBehind).toFixed(1),
          streak: s.streak,
        })),
        timestamp: new Date(),
        season: 'CPBL-2025',
        period: seasonType,
      };
    } catch (error) {
      console.error('Error in getCurrentStandings:', error);
      throw error;
    }
  }

  @Get('history')
  async getStandingsHistory(@Query('teamId') teamId?: string, @Query('limit') limit = 30) {
    const query = this.teamStandingsHistoryRepository
      .createQueryBuilder('h')
      .orderBy('h.recorded_date', 'DESC')
      .addOrderBy('h.rank', 'ASC')
      .limit(parseInt(limit as any) || 30);

    if (teamId) {
      query.where('h.team_id = :teamId', { teamId });
    }

    const history = await query.getMany();

    // 查詢隊伍信息
    const teamIds = [...new Set(history.map((h) => h.team_id))];
    const teams = await this.teamRepository.find({
      where: { id: teamIds } as any,
    });
    const teamMap = new Map(teams.map((t) => [t.id, t]));

    return {
      data: history.map((h) => ({
        rank: h.rank,
        teamId: h.team_id,
        teamName: teamMap.get(h.team_id)?.name || h.team_id,
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
