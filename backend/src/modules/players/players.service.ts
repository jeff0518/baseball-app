import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatterStats } from '../../entities';
import { MockDataService } from './mock-data.service';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(BatterStats)
    private batterStatsRepo: Repository<BatterStats>,
    private mockDataService: MockDataService,
  ) {}

  async getAllBatters(page = 1, limit = 10) {
    // For now, return mock data
    const allBatters = this.mockDataService.getBattersMockData();
    const skip = (page - 1) * limit;
    const data = allBatters.slice(skip, skip + limit);

    return {
      data,
      total: allBatters.length,
      page,
      limit,
    };
  }

  async getBatterById(playerId: string) {
    // For now, return mock data
    const allBatters = this.mockDataService.getBattersMockData();
    return allBatters.find((b) => b.playerId === playerId) || null;
  }

  async searchBatters(keyword: string, page = 1, limit = 10) {
    // For now, search mock data
    const allBatters = this.mockDataService.getBattersMockData();
    const filtered = allBatters.filter(
      (b) =>
        b.playerName.includes(keyword) ||
        b.playerNumber.includes(keyword) ||
        b.playerId.includes(keyword),
    );

    const skip = (page - 1) * limit;
    const data = filtered.slice(skip, skip + limit);

    return {
      data,
      total: filtered.length,
      page,
      limit,
    };
  }

  async getBatterStats(playerId: string) {
    const batter = await this.getBatterById(playerId);
    if (!batter) return null;

    // Calculate derived stats
    const AVG = batter.AB > 0 ? (batter.H / batter.AB).toFixed(3) : '0.000';
    const OBP = (batter.H + batter.BB + batter.HBP) / batter.PA;
    const SLG = (batter.H + batter['2B'] + batter['3B'] * 2 + batter.HR * 3) / batter.AB;
    const OPS = parseFloat(AVG) + OBP;

    return {
      ...batter,
      AVG: parseFloat(AVG),
      OBP: parseFloat(OBP.toFixed(3)),
      SLG: parseFloat(SLG.toFixed(3)),
      OPS: parseFloat(OPS.toFixed(3)),
    };
  }
}
