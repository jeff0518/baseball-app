import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export interface TeamStanding {
  rank: number;
  teamName: string;
  teamCode: string;
  wins: number;
  losses: number;
  draws: number;
  gamesPlayed: number;
  winRate: string;
  gamesBehind: string;
  streak?: string;
}

@Injectable()
export class ScraperService {
  private readonly CPBL_URL =
    'https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard';

  async scrapeTeamStandings(): Promise<TeamStanding[]> {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.goto(this.CPBL_URL, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait for the standings table to load
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

  private parseTeamStandings(htmlContent: string): TeamStanding[] {
    const $ = cheerio.load(htmlContent);
    const standings: TeamStanding[] = [];

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
          gamesPlayed: parseInt(gamesPlayed) || wins + losses + draws,
          winRate,
          gamesBehind,
          streak,
        });
      }
    });

    return standings;
  }

  private extractTeamCode(teamName: string): string {
    // Map traditional team names to codes
    const teamCodeMap: { [key: string]: string } = {
      中信兄弟: 'BRO',
      樂天桃猿: 'ENG',
      樂天銀河: 'ENG',
      統一獅: 'LIO',
      '統一7-ELEVEn獅': 'LIO',
      富邦悍將: 'FAG',
      臺鋼雄鷹: 'DMO',
    };

    for (const [name, code] of Object.entries(teamCodeMap)) {
      if (teamName.includes(name)) {
        return code;
      }
    }

    return 'UNKNOWN';
  }
}
