import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { TeamStanding, TeamStandingsHistory, Season } from '../../entities';

export interface TeamStandingRaw {
  rank: number;
  teamName: string;
  teamCode: string;
  wins: number;
  losses: number;
  draws: number;
  winRate: string;
  gamesBehind: string;
  streak: string;
}

@Injectable()
export class ScraperService {
  private readonly CPBL_BASE_URL =
    'https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard';

  // 映射 tab 參數到 season_type
  private readonly TAB_MAP = {
    '': 'regular_season',      // 默認是全年度
    '&tab=half1': 'first_half',   // 上半季
    '&tab=half2': 'second_half',  // 下半季
  };

  constructor(
    @InjectRepository(TeamStanding)
    private teamStandingRepository: Repository<TeamStanding>,
    @InjectRepository(TeamStandingsHistory)
    private teamStandingsHistoryRepository: Repository<TeamStandingsHistory>,
    @InjectRepository(Season)
    private seasonRepository: Repository<Season>,
  ) {}

  @Cron('0 12 * * *') // 每天 12:00
  async scrapeAndSaveTeamStandings(): Promise<void> {
    console.log('🌐 Starting CPBL standings scrape at', new Date().toISOString());
    try {
      // 爬蟲 3 種季段的資料
      const allStandings = await this.scrapeAllPeriods();
      await this.saveAllStandings(allStandings);
      console.log('✅ CPBL standings saved successfully');
    } catch (error) {
      console.error('❌ Scrape failed:', error instanceof Error ? error.message : String(error));
    }
  }

  private async scrapeAllPeriods(): Promise<Array<{ type: string; standings: TeamStandingRaw[] }>> {
    const results = [];
    for (const [tabParam, seasonType] of Object.entries(this.TAB_MAP)) {
      const url = this.CPBL_BASE_URL + tabParam;
      console.log(`📥 Scraping ${seasonType} from ${url}`);
      const standings = await this.scrapeTeamStandings(url);
      results.push({ type: seasonType, standings });
    }
    return results;
  }

  async scrapeTeamStandings(url: string = this.CPBL_BASE_URL): Promise<TeamStandingRaw[]> {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      await page.waitForSelector('table', { timeout: 10000 });

      const htmlContent = await page.content();
      return this.parseTeamStandings(htmlContent);
    } catch (error) {
      throw new Error(`Failed to scrape CPBL standings: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  private parseTeamStandings(htmlContent: string): TeamStandingRaw[] {
    const $ = cheerio.load(htmlContent);
    const standings: TeamStandingRaw[] = [];

    const rows = $('tbody tr');

    if (rows.length === 0) {
      throw new Error('No standings data found in the page');
    }

    rows.each((index, element) => {
      const cells = $(element).find('td');

      if (cells.length >= 8) {
        const teamName = $(cells[0]).text().trim();
        const wins = parseInt($(cells[1]).text().trim()) || 0;
        const losses = parseInt($(cells[2]).text().trim()) || 0;
        const draws = parseInt($(cells[3]).text().trim()) || 0;
        const gamesBehind = $(cells[4]).text().trim();
        const gamesPlayed = $(cells[5]).text().trim();
        const winRate = $(cells[6]).text().trim();
        const streak = $(cells[7]).text().trim();

        standings.push({
          rank: index + 1,
          teamName,
          teamCode: this.extractTeamCode(teamName),
          wins,
          losses,
          draws,
          winRate,
          gamesBehind,
          streak,
        });
      }
    });

    return standings;
  }

  private extractTeamCode(teamName: string): string {
    const teamCodeMap: { [key: string]: string } = {
      中信兄弟: 'BRO',
      樂天桃猿: 'RAK',
      樂天: 'RAK',
      統一獅: 'UNI',
      統一: 'UNI',
      富邦悍將: 'FUB',
      富邦: 'FUB',
      台鋼雄鷹: 'TSG',
      雄鷹: 'TSG',
      味全龍: 'WDR',
      龍: 'WDR',
    };

    for (const [name, code] of Object.entries(teamCodeMap)) {
      if (teamName.includes(name)) {
        return code;
      }
    }

    return 'UNKNOWN';
  }

  private async saveAllStandings(allStandings: Array<{ type: string; standings: TeamStandingRaw[] }>): Promise<void> {
    const season = await this.seasonRepository.findOne({
      where: { code: 'CPBL-2025' },
    });

    if (!season) {
      throw new Error('Season CPBL-2025 not found');
    }

    const now = new Date();
    const recordedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (const { type: seasonType, standings } of allStandings) {
      for (const standing of standings) {
        const winRateNum = this.parseWinRate(standing.winRate);
        const gamesBehindNum = this.parseGamesBehind(standing.gamesBehind);

        const teamStandingData = {
          season_id: season.id,
          team_id: standing.teamCode,
          season_type: seasonType,
          rank: standing.rank,
          wins: standing.wins,
          losses: standing.losses,
          draws: standing.draws,
          winRate: winRateNum,
          gamesBehind: gamesBehindNum,
          streak: standing.streak,
          scrapedAt: now,
        };

        // 檢查是否存在，存在則更新，不存在則插入
        const existing = await this.teamStandingRepository.findOne({
          where: { season_id: season.id, team_id: standing.teamCode, season_type: seasonType },
        });

        if (existing) {
          await this.teamStandingRepository.update(
            { season_id: season.id, team_id: standing.teamCode, season_type: seasonType },
            teamStandingData,
          );
        } else {
          await this.teamStandingRepository.save(teamStandingData);
        }

        // 插入 team_standings_history (歷史記錄)
        await this.teamStandingsHistoryRepository.save({
          season_id: season.id,
          team_id: standing.teamCode,
          season_type: seasonType,
          rank: standing.rank,
          wins: standing.wins,
          losses: standing.losses,
          draws: standing.draws,
          winRate: winRateNum,
          gamesBehind: gamesBehindNum,
          streak: standing.streak,
          recorded_date: recordedDate,
          scrapedAt: now,
        });
      }
    }
  }

  private parseWinRate(winRateStr: string): number {
    // "58.3%" → 0.583
    const num = parseFloat(winRateStr.replace('%', ''));
    return num / 100;
  }

  private parseGamesBehind(gamesBehindStr: string): number {
    // ".0" → 0.0, "4.0" → 4.0
    return parseFloat(gamesBehindStr) || 0;
  }
}
