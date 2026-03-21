import { TeamStanding } from '../../../entities';
import { Team } from '../../../entities';
import { TeamStandingDTO } from './standings.dto';

export class StandingsMapper {
  static toDTO(standing: TeamStanding, team: Team): TeamStandingDTO {
    const gamesBehind = standing.gamesBehind || 0;
    const winRate = standing.winRate || 0;
    
    // Convert streak format: Chinese (1敗/1勝) to English (L1/W1)
    let streak = standing.streak || '';
    if (streak.includes('敗')) {
      const match = streak.match(/(\d+)敗/);
      streak = match ? `L${match[1]}` : streak;
    } else if (streak.includes('勝')) {
      const match = streak.match(/(\d+)勝/);
      streak = match ? `W${match[1]}` : streak;
    }
    
    return {
      rank: standing.rank,
      teamId: standing.team_id,
      teamName: team?.name || 'Unknown',
      teamLogoUrl: team?.logo_url || '',
      teamAvatarUrl: team?.avatar_url || '',
      wins: standing.wins,
      losses: standing.losses,
      draws: standing.draws,
      gamesPlayed: standing.wins + standing.losses + standing.draws,
      winRate: `${((winRate || 0) * 100).toFixed(1)}%`,
      gamesBehind: gamesBehind === Math.floor(gamesBehind) ? gamesBehind.toFixed(0) : gamesBehind.toFixed(1),
      streak,
      scrapedAt: standing.scrapedAt,
    };
  }
}
