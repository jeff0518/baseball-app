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

    console.log('=== TABLE HEADERS ===');
    const headers: any[] = [];
    $('thead th').each((index, element) => {
      const text = $(element).text().trim();
      console.log(`Column ${index}: ${text}`);
      headers.push(text);
    });

    console.log('\n=== FIRST ROW WITH HEADERS ===');
    const firstRow: any = {};
    $('tbody tr').first().find('td').each((index, element) => {
      const text = $(element).text().trim();
      firstRow[headers[index] || `col${index}`] = text;
    });
    console.log(JSON.stringify(firstRow, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
