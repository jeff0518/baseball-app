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
  
  // 缓存存储
  private cachedVideos: YouTubeVideo[] | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION_MS = 3600000; // 1 小时

  async getLatestVideos(limit: number = 3): Promise<YouTubeVideo[]> {
    // 检查缓存是否有效
    const now = Date.now();
    if (this.cachedVideos && (now - this.lastFetchTime < this.CACHE_DURATION_MS)) {
      console.log('📦 Using cached videos');
      return this.cachedVideos.slice(0, limit);
    }

    // 尝试爬取新数据
    const videos = await this.scrapeVideos();
    
    if (videos.length > 0) {
      // 更新缓存
      this.cachedVideos = videos;
      this.lastFetchTime = now;
      console.log(`💾 Cached ${videos.length} videos`);
    } else if (this.cachedVideos) {
      // 爬虫失败但有缓存，使用缓存
      console.log('⚠️  Scrape failed, using cached videos');
      return this.cachedVideos.slice(0, limit);
    } else {
      // 没有缓存，使用默认数据
      console.log('❌ Scrape failed, using fallback data');
      return this.getDefaultVideos().slice(0, limit);
    }

    // 返回最新的N个视频
    return videos.slice(0, limit);
  }

  private async scrapeVideos(): Promise<YouTubeVideo[]> {
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
      videos.slice(0, 5).forEach((v, idx) => {
        console.log(`  ${idx + 1}. [${v.id}] ${v.title.substring(0, 60)}...`);
      });

      return videos;
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
        title: '【RHINOSHIELD 壓制全場】03/21 謝榮豪中繼一局送出一次三振無失分｜CTBC Brothers 中信兄弟',
        thumbnail: 'https://img.youtube.com/vi/XQQd_K_3a6A/hqdefault.jpg',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'vmTqo67Cack',
        title: '【RHINOSHIELD 壓制全場】03/21 羅戈先發4.2局狂飆七張老K僅失兩分｜CTBC Brothers 中信兄弟',
        thumbnail: 'https://img.youtube.com/vi/vmTqo67Cack/hqdefault.jpg',
        publishedAt: new Date().toISOString(),
      },
      {
        id: 'FmVQjJjZTKw',
        title: '【中彰賓士美技連發】03/21 曾頌恩、張仁瑋一左一右！外野美技連發｜CTBC Brothers 中信兄弟',
        thumbnail: 'https://img.youtube.com/vi/FmVQjJjZTKw/hqdefault.jpg',
        publishedAt: new Date().toISOString(),
      },
    ];
  }
}
