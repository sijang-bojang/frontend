export interface Market {
  market_id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface Spot {
  spotId: number;
  marketId: number;
  marketName: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  missionCount?: number;
  courseNames?: string[];
  visitMissionTitles?: string[];
}

export interface CreateMarketRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface UpdateMarketRequest {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
}

export interface MarketSearchParams {
  query?: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // km 단위
  limit?: number;
  offset?: number;
}

export interface MarketSearchResponse {
  markets: Market[];
  total: number;
  hasMore: boolean;
}
