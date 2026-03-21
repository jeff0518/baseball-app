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

async function scrapePeriod(page: any, periodTab: string): Promise<Standing[]> {
  // Click the period tab
  const tabSelector = `button:contains('${periodTab}')`;
  
  // Use different selectors based on period
  let clickedTab = false;
  if (periodTab === '全年度') {
    // Look for 全年度 button
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate((el: any) => el.textContent, btn);
      if (text.includes('全年度')) {
        await btn.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});
        clickedTab = true;
        break;
      }
    }
  } else if (periodTab === '上半季') {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate((el: any) => el.textContent, btn);
      if (text.includes('上半季')) {
        await btn.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});
        clickedTab = true;
        break;
      }
    }
  } else if (periodTab === '下半季') {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate((el: any) => el.textContent, btn);
      if (text.includes('下半季')) {
        await btn.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});
        clickedTab = true;
        break;
      }
    }
  }

  if (!clickedTab) {
    console.warn(`Could not find tab for ${periodTab}`);
  }

  await page.waitForTimeout(1000);

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
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://www.rebas.tw/season/CPBL-2025-JO/leaderboard?stats=team&section=standard', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await page.waitForSelector('table', { timeout: 10000 });

    console.log('=== 全年度 ===');
    const fullYear = await scrapePeriod(page, '全年度');
    console.log(JSON.stringify(fullYear, null, 2));

    console.log('\n=== 上半季 ===');
    const firstHalf = await scrapePeriod(page, '上半季');
    console.log(JSON.stringify(firstHalf, null, 2));

    console.log('\n=== 下半季 ===');
    const secondHalf = await scrapePeriod(page, '下半季');
    console.log(JSON.stringify(secondHalf, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
