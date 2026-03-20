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

export interface ApiResponse<T> {
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

export const playerApi = {
  getAllPlayers: async (page = 1, limit = 10): Promise<ApiResponse<BatterStats[]>> => {
    const response = await fetch(`${API_BASE_URL}/api/players?page=${page}&limit=${limit}`);
    return response.json();
  },

  searchPlayers: async (keyword: string, page = 1, limit = 10): Promise<ApiResponse<BatterStats[]>> => {
    const response = await fetch(
      `${API_BASE_URL}/api/players/search?keyword=${keyword}&page=${page}&limit=${limit}`
    );
    return response.json();
  },

  getPlayerById: async (playerId: string): Promise<BatterStats | null> => {
    const response = await fetch(`${API_BASE_URL}/api/players/${playerId}`);
    return response.json();
  },

  getPlayerStats: async (playerId: string): Promise<BatterStats | null> => {
    const response = await fetch(`${API_BASE_URL}/api/players/${playerId}/stats`);
    return response.json();
  },
};
