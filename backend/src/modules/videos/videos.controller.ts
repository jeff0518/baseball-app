import { Controller, Get, Query } from '@nestjs/common';
import { VideosService, YouTubeVideo } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('latest')
  async getLatestVideos(@Query('limit') limit: string = '3'): Promise<{ data: YouTubeVideo[] }> {
    const limitNum = Math.min(parseInt(limit) || 3, 10); // 最多10个视频
    
    try {
      const videos = await this.videosService.getLatestVideos(limitNum);
      
      // 如果爬虫返回空数组，使用备用数据
      if (videos.length === 0) {
        console.warn('YouTube scraper returned no videos, using fallback data');
        return { data: this.videosService.getDefaultVideos().slice(0, limitNum) };
      }
      
      return { data: videos };
    } catch (error) {
      console.error('Error fetching videos:', error);
      // 出错时返回备用数据
      return { data: this.videosService.getDefaultVideos().slice(0, limitNum) };
    }
  }
}
