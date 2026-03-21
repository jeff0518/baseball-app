export class TeamStandingDTO {
  rank: number;
  teamId: string;
  teamName: string;
  teamLogoUrl: string;
  teamAvatarUrl: string;
  wins: number;
  losses: number;
  draws: number;
  gamesPlayed: number;
  winRate: string; // "58.3%"
  gamesBehind: string; // "0", "4.0"
  streak: string; // "1L", "W3"
  scrapedAt: Date;
}

export class StandingsResponseDTO {
  data: TeamStandingDTO[];
  timestamp: Date;
  season: string;
}
