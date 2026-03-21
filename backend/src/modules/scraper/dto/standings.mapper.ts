import { TeamStanding } from '../../../entities';
import { TeamStandingDTO } from './standings.dto';

export class StandingsMapper {
  static toDTO(standing: TeamStanding): TeamStandingDTO {
    return {
      rank: standing.rank,
      teamId: standing.team_id,
      teamName: standing.team.name,
      teamLogoUrl: standing.team.logo_url,
      teamAvatarUrl: standing.team.avatar_url,
      wins: standing.wins,
      losses: standing.losses,
      draws: standing.draws,
      gamesPlayed: standing.wins + standing.losses + standing.draws,
      winRate: this.formatWinRate(standing.winRate),
      gamesBehind: this.formatGamesBehind(standing.gamesBehind),
      streak: standing.streak,
      scrapedAt: standing.scrapedAt,
    };
  }

  private static formatWinRate(winRate: number): string {
    // 0.593 → "59.3%"
    return `${(winRate * 100).toFixed(1)}%`;
  }

  private static formatGamesBehind(gamesBehind: number): string {
    // 0.0 → "0", 4.0 → "4.0"
    return gamesBehind === Math.floor(gamesBehind) ? gamesBehind.toFixed(0) : gamesBehind.toFixed(1);
  }
}
