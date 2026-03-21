import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Team, Season } from './entities';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log('🌱 Starting seed...');

    // 建立 teams
    const teams = [
      {
        id: 'BRO',
        name: '中信兄弟',
        logo_url: '/team_official/brothers_logo.png',
        avatar_url: '/team_avatar/caplogo-bothers.png',
      },
      {
        id: 'RAK',
        name: '樂天桃猿',
        logo_url: '/team_official/rakuten_logo.png',
        avatar_url: '/team_avatar/caplogo-rakuten.png',
      },
      {
        id: 'UNI',
        name: '統一獅',
        logo_url: '/team_official/unil_logo.png',
        avatar_url: '/team_avatar/caplogo-unil.png',
      },
      {
        id: 'FUB',
        name: '富邦悍將',
        logo_url: '/team_official/fubon_logo.png',
        avatar_url: '/team_avatar/caplogo-fubon.png',
      },
      {
        id: 'TSG',
        name: '台鋼雄鷹',
        logo_url: '/team_official/hawks_logo.png',
        avatar_url: '/team_avatar/caplogo-hawks.png',
      },
      {
        id: 'WDR',
        name: '味全龍',
        logo_url: '/team_official/dragon_logo.png',
        avatar_url: '/team_avatar/caplogo-dragon.png',
      },
    ];

    console.log('📝 Inserting teams...');
    const teamRepository = dataSource.getRepository(Team);
    await teamRepository.save(teams);
    console.log('✅ Teams created:', teams.map((t) => t.id).join(', '));

    // 建立 season
    const season = {
      code: 'CPBL-2025',
      year: 2025,
      type: 'regular_season',
      start_date: new Date('2025-03-21'),
      end_date: new Date('2025-11-30'),
    };

    console.log('📝 Inserting season...');
    const seasonRepository = dataSource.getRepository(Season);
    await seasonRepository.save(season);
    console.log('✅ Season created: CPBL-2025');

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

seed();
