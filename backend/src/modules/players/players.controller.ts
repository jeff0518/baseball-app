import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('api/players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  async getAllPlayers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.playersService.getAllBatters(page, limit);
  }

  @Get('search')
  async searchPlayers(
    @Query('keyword') keyword: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    if (!keyword) {
      return { data: [], message: 'keyword is required' };
    }
    return this.playersService.searchBatters(keyword, page, limit);
  }

  @Get(':id')
  async getPlayerById(@Param('id') playerId: string) {
    const player = await this.playersService.getBatterById(playerId);
    if (!player) {
      return { message: 'Player not found' };
    }
    return player;
  }

  @Get(':id/stats')
  async getPlayerStats(@Param('id') playerId: string) {
    const stats = await this.playersService.getBatterStats(playerId);
    if (!stats) {
      return { message: 'Player not found' };
    }
    return stats;
  }
}
