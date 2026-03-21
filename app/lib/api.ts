const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface BatterStats {
  playerId: string;
  playerNumber: string;
  playerName: string;
  PA: number;
  AB: number;
  H: number;
  '2B': number;
  '3B': number;
  HR: number;
  R: number;
  RBI: number;
  BB: number;
  IBB: number;
  HBP: number;
  SO: number;
  SH: number;
  SF: number;
  E: number;
  SB: number;
  CS: number;
  AVG?: number;
  OBP?: number;
  SLG?: number;
  OPS?: number;
}

export interface PitcherStats {
  playerId: string;
  playerNumber: string;
  playerName: string;
  IP: string; // 投球局數
  W: number;  // 勝
  L: number;  // 敗
  SV: number; // 救援
  HLD: number;// 中繼
  SO: number; // 三振
  ERA: number;// 自責分率
  WHIP: number;
}

export interface Standing {
  team: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  winRate: number;
  gamesBehind: string;
  streak: string;
}

export interface GameSchedule {
  id: string;
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

const MOCK_BATTERS: BatterStats[] = [
  {
    playerId: 'BAT001',
    playerNumber: '90',
    playerName: '江坤宇',
    PA: 150,
    AB: 120,
    H: 45,
    '2B': 8,
    '3B': 2,
    HR: 5,
    R: 28,
    RBI: 32,
    BB: 20,
    IBB: 2,
    HBP: 3,
    SO: 18,
    SH: 2,
    SF: 1,
    E: 0,
    SB: 5,
    CS: 1,
    AVG: 0.375,
    OBP: 0.453,
    SLG: 0.583,
    OPS: 1.036
  },
  {
    playerId: 'BAT002',
    playerNumber: '1',
    playerName: '岳政華',
    PA: 145,
    AB: 115,
    H: 42,
    '2B': 6,
    '3B': 1,
    HR: 4,
    R: 25,
    RBI: 28,
    BB: 22,
    IBB: 1,
    HBP: 2,
    SO: 20,
    SH: 3,
    SF: 2,
    E: 1,
    SB: 8,
    CS: 2,
    AVG: 0.365,
    OBP: 0.462,
    SLG: 0.539,
    OPS: 1.001
  },
  {
    playerId: 'BAT003',
    playerNumber: '16',
    playerName: '周思齊',
    PA: 155,
    AB: 128,
    H: 50,
    '2B': 10,
    '3B': 3,
    HR: 8,
    R: 35,
    RBI: 42,
    BB: 18,
    IBB: 3,
    HBP: 2,
    SO: 22,
    SH: 1,
    SF: 0,
    E: 0,
    SB: 3,
    CS: 1,
    AVG: 0.391,
    OBP: 0.452,
    SLG: 0.703,
    OPS: 1.155
  }
];

const MOCK_PITCHERS: PitcherStats[] = [
  {
    playerId: 'PIT001',
    playerNumber: '41',
    playerName: '德保拉',
    IP: '120.2',
    W: 12,
    L: 4,
    SV: 0,
    HLD: 0,
    SO: 110,
    ERA: 2.85,
    WHIP: 1.15
  },
  {
    playerId: 'PIT002',
    playerNumber: '19',
    playerName: '鄭凱文',
    IP: '95.0',
    W: 8,
    L: 3,
    SV: 0,
    HLD: 0,
    SO: 65,
    ERA: 3.42,
    WHIP: 1.28
  },
  {
    playerId: 'PIT003',
    playerNumber: '58',
    playerName: '呂彥青',
    IP: '55.1',
    W: 3,
    L: 2,
    SV: 15,
    HLD: 5,
    SO: 58,
    ERA: 2.15,
    WHIP: 1.05
  }
];

const MOCK_STANDINGS: Record<string, Standing[]> = {
  'full': [
    { team: '中信兄弟', played: 120, won: 70, lost: 48, drawn: 2, winRate: 0.593, gamesBehind: '-', streak: '3連勝' },
    { team: '統一獅', played: 120, won: 65, lost: 53, drawn: 2, winRate: 0.551, gamesBehind: '5.0', streak: '1敗' },
    { team: '樂天桃猿', played: 120, won: 62, lost: 56, drawn: 2, winRate: 0.525, gamesBehind: '8.0', streak: '2連敗' },
    { team: '味全龍', played: 120, won: 58, lost: 60, drawn: 2, winRate: 0.492, gamesBehind: '12.0', streak: '1勝' },
    { team: '富邦悍將', played: 120, won: 52, lost: 66, drawn: 2, winRate: 0.441, gamesBehind: '18.0', streak: '2勝' },
    { team: '台鋼雄鷹', played: 120, won: 49, lost: 69, drawn: 2, winRate: 0.415, gamesBehind: '21.0', streak: '1敗' },
  ],
  'first': [
    { team: '統一獅', played: 60, won: 37, lost: 23, drawn: 0, winRate: 0.617, gamesBehind: '-', streak: '2勝' },
    { team: '中信兄弟', played: 60, won: 32, lost: 26, drawn: 2, winRate: 0.552, gamesBehind: '4.0', streak: '1敗' },
    { team: '樂天桃猿', played: 60, won: 31, lost: 28, drawn: 1, winRate: 0.525, gamesBehind: '5.5', streak: '1勝' },
    { team: '味全龍', played: 60, won: 28, lost: 30, drawn: 2, winRate: 0.483, gamesBehind: '8.0', streak: '2敗' },
    { team: '台鋼雄鷹', played: 60, won: 24, lost: 36, drawn: 0, winRate: 0.400, gamesBehind: '13.0', streak: '3敗' },
    { team: '富邦悍將', played: 60, won: 23, lost: 37, drawn: 0, winRate: 0.383, gamesBehind: '14.0', streak: '1勝' },
  ],
  'second': [
    { team: '中信兄弟', played: 60, won: 38, lost: 22, drawn: 0, winRate: 0.633, gamesBehind: '-', streak: '4勝' },
    { team: '味全龍', played: 60, won: 30, lost: 30, drawn: 0, winRate: 0.500, gamesBehind: '8.0', streak: '1勝' },
    { team: '樂天桃猿', played: 60, won: 31, lost: 28, drawn: 1, winRate: 0.525, gamesBehind: '6.5', streak: '2敗' },
    { team: '富邦悍將', played: 60, won: 29, lost: 29, drawn: 2, winRate: 0.500, gamesBehind: '8.0', streak: '1敗' },
    { team: '統一獅', played: 60, won: 28, lost: 30, drawn: 2, winRate: 0.483, gamesBehind: '9.0', streak: '2勝' },
    { team: '台鋼雄鷹', played: 60, won: 25, lost: 33, drawn: 2, winRate: 0.431, gamesBehind: '12.0', streak: '1勝' },
  ],
};

const MOCK_GAMES: GameSchedule[] = [
  { id: 'g1', date: '2026-03-24', time: '18:35', opponent: '統一獅', location: '洲際棒球場', isHome: true },
  { id: 'g2', date: '2026-03-25', time: '18:35', opponent: '統一獅', location: '洲際棒球場', isHome: true },
  { id: 'g3', date: '2026-03-27', time: '18:35', opponent: '樂天桃猿', location: '桃園棒球場', isHome: false },
];

export const playerApi = {
  getStandings: async (period: string = 'full'): Promise<Standing[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_STANDINGS[period] || MOCK_STANDINGS['full'];
  },

  getUpcomingGames: async (): Promise<GameSchedule[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_GAMES;
  },

  getFeaturedPlayers: async (type: 'batter' | 'pitcher' = 'batter'): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return type === 'batter' ? MOCK_BATTERS : MOCK_PITCHERS;
  },

  getAllPlayers: async (page = 1, limit = 10): Promise<ApiResponse<BatterStats[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const skip = (page - 1) * limit;
    const data = MOCK_BATTERS.slice(skip, skip + limit);
    return { data, total: MOCK_BATTERS.length, page, limit };
  },

  searchPlayers: async (keyword: string, page = 1, limit = 10): Promise<ApiResponse<BatterStats[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const filtered = MOCK_BATTERS.filter(
      (b) => b.playerName.includes(keyword) || b.playerNumber.includes(keyword) || b.playerId.includes(keyword),
    );
    const skip = (page - 1) * limit;
    const data = filtered.slice(skip, skip + limit);
    return { data, total: filtered.length, page, limit };
  },

  getPlayerById: async (playerId: string): Promise<BatterStats | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_BATTERS.find((b) => b.playerId === playerId) || null;
  },
};
