import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

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

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    const standings: any[] = [];
    const rows = $('tbody tr');

    console.log(`Found ${rows.length} rows`);

    rows.each((index, element) => {
      const cells = $(element).find('td');
      console.log(`Row ${index}: ${cells.length} cells`);

      if (cells.length >= 8) {
        const teamName = $(cells[0]).text().trim();
        const col1 = $(cells[1]).text().trim();
        const col2 = $(cells[2]).text().trim();
        const col3 = $(cells[3]).text().trim();
        const col4 = $(cells[4]).text().trim();
        const col5 = $(cells[5]).text().trim();
        const col6 = $(cells[6]).text().trim();
        const col7 = $(cells[7]).text().trim();

        standings.push({
          rank: index + 1,
          teamName,
          col1,
          col2,
          col3,
          col4,
          col5,
          col6,
          col7,
        });
      }
    });

    console.log('\n=== RAW DATA ===');
    console.log(JSON.stringify(standings, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
