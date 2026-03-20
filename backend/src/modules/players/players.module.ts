import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatterStats } from '../../entities';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MockDataService } from './mock-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([BatterStats])],
  controllers: [PlayersController],
  providers: [PlayersService, MockDataService],
})
export class PlayersModule {}
