import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

@Injectable()
export class VideosService {
  // 兄弟象官方频道
  private readonly BROTHERS_CHANNEL_URL = 'https://www.youtube.com/@BrotherElephantTV05/videos';

  async getLatestVideos(limit: number = 3): Promise<YouTubeVideo[]> {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      
      console.log(`📺 Loading: ${this.BROTHERS_CHANNEL_URL}`);
      await page.goto(this.BROTHERS_CHANNEL_URL, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      console.log('⏳ Waiting for content...');
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 滚动页面以加载更多内容
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight * 3);
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      // 提取视频数据
      const videos = await page.evaluate(() => {
        const results: any[] = [];
        const seen = new Set<string>();

        // 搜索所有视频链接
        const links = document.querySelectorAll('a[href*="/watch?v="]');
        
        links.forEach((link) => {
          const href = link.getAttribute('href') || '';
          const videoIdMatch = href.match(/v=([a-zA-Z0-9_-]{11})/);
          if (!videoIdMatch) return;

          const videoId = videoIdMatch[1];
          if (seen.has(videoId)) return;
          
          // 获取标题 - 优先使用 title 属性（这是播放列表项的完整标题）
          let title = 
            link.getAttribute('title') ||
            link.getAttribute('aria-label') ||
            '';

          // 如果从 aria-label 获取，需要清理时长部分
          if (!link.getAttribute('title') && title.includes('分鐘')) {
            title = title.replace(/\s+\d+\s*分[鐘钟].*$/i, '').trim();
          }

          // 清理标题
          title = title.replace(/現正播放|正在播放/g, '').trim();

          if (title && videoId && title.length > 5) { // 标题长度 > 5
            results.push({
              id: videoId,
              title: title.substring(0, 200),
              thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              publishedAt: new Date().toISOString(),
            });
            seen.add(videoId);
          }
        });

        return results;
      });

      console.log(`✅ Found ${videos.length} videos`);
      videos.forEach((v, idx) => {
        console.log(`  ${idx + 1}. [${v.id}] ${v.title}`);
      });

      // 返回最新的N个视频
      return videos.slice(0, limit);
    } catch (error) {
      console.error('❌ Failed to fetch YouTube videos:', error instanceof Error ? error.message : error);
      return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  // 备用数据（如果爬虫失败）
  getDefaultVideos(): YouTubeVideo[] {
    return [
      {
        id: 'XQQd_K_3a6A',
        title: '【RHINOSHIELD 壓制全場】03/21 謝榮豪中繼一局送出一次三振無失分',
        thumbnail: 'https://img.youtube.com/vi/XQQd_K_3a6A/hqdefault.jpg',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'vmTqo67Cack',
        title: '【RHINOSHIELD 壓制全場】03/21 羅戈先發4.2局狂飆七張老K僅失兩分',
        thumbnail: 'https://img.youtube.com/vi/vmTqo67Cack/hqdefault.jpg',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'FmVQjJjZTKw',
        title: '【中彰賓士美技連發】03/21 曾頌恩、張仁瑋一左一右！外野美技連發',
        thumbnail: 'https://img.youtube.com/vi/FmVQjJjZTKw/hqdefault.jpg',
        publishedAt: new Date().toISOString(),
      },
    ];
  }
}
