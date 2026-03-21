import { TeamStanding } from '../../../entities';
import { Team } from '../../../entities';
import { TeamStandingDTO } from './standings.dto';

export class StandingsMapper {
  static toDTO(standing: TeamStanding, team: Team): TeamStandingDTO {
    const gamesBehind = standing.gamesBehind || 0;
    const winRate = standing.winRate || 0;
    
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
      streak: standing.streak || '',
      scrapedAt: standing.scrapedAt,
    };
  }
}
