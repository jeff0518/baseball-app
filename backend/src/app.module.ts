import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { PlayersModule } from './modules/players/players.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), PlayersModule],
})
export class AppModule {}
