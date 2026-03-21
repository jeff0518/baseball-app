import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

interface Standing {
  rank: number;
  teamName: string;
  wins: number;
  losses: number;
  draws: number;
  gamesBehind: string;
  winRate: string;
  streak: string;
}

async function scrapePage(url: string): Promise<Standing[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    const standings: Standing[] = [];
    const rows = $('tbody tr');

    rows.each((index, element) => {
      const cells = $(element).find('td');
      if (cells.length >= 8) {
        const teamName = $(cells[0]).text().trim();
        const wins = parseInt($(cells[1]).text().trim()) || 0;
        const losses = parseInt($(cells[2]).text().trim()) || 0;
        const draws = parseInt($(cells[3]).text().trim()) || 0;
        const gamesBehind = $(cells[4]).text().trim();
        const winRate = $(cells[6]).text().trim();
        const streak = $(cells[7]).text().trim();

        standings.push({
          rank: index + 1,
          teamName,
          wins,
          losses,
          draws,
          gamesBehind,
          winRate,
          streak,
        });
      }
    });

    return standings;
  } finally {
    await browser.close();
  }
}

(async () => {
  try {
    console.log('=== 全年度 ===');
    const fullYear = await scrapePage('https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard&tab=regular');
    console.log(JSON.stringify(fullYear, null, 2));

    console.log('\n=== 上半季 ===');
    const firstHalf = await scrapePage('https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard&tab=half1');
    console.log(JSON.stringify(firstHalf, null, 2));

    console.log('\n=== 下半季 ===');
    const secondHalf = await scrapePage('https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard&tab=half2');
    console.log(JSON.stringify(secondHalf, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
})();
