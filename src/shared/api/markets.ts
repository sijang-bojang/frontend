import { supabase } from "../lib/supabase";
import {
  Market,
  CreateMarketRequest,
  UpdateMarketRequest,
  MarketSearchParams,
  MarketSearchResponse,
} from "../types/market";

/**
 * 모든 시장 조회
 * GET /api/markets
 */
export const getAllMarkets = async (): Promise<Market[]> => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .select("*")
      .order("name");

    if (error) {
      throw new Error(`시장 조회 실패: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error("시장 조회 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 특정 시장 조회
 * GET /api/markets/{marketId}
 */
export const getMarketById = async (marketId: number): Promise<Market> => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .select("*")
      .eq("market_id", marketId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error(`시장을 찾을 수 없습니다: ${marketId}`);
      }
      throw new Error(`시장 조회 실패: ${error.message}`);
    }

    if (!data) {
      throw new Error(`시장을 찾을 수 없습니다: ${marketId}`);
    }

    return data;
  } catch (error) {
    console.error(`시장 ${marketId} 조회 중 오류 발생:`, error);
    throw error;
  }
};

/**
 * 시장 검색
 * GET /api/markets/search
 */
export const searchMarkets = async (
  params: MarketSearchParams
): Promise<MarketSearchResponse> => {
  try {
    let query = supabase.from("markets").select("*", { count: "exact" });

    // 텍스트 검색
    if (params.query) {
      query = query.or(
        `name.ilike.%${params.query}%,address.ilike.%${params.query}%,description.ilike.%${params.query}%`
      );
    }

    // 위치 기반 검색 (위도/경도 + 반경)
    if (params.latitude && params.longitude && params.radius) {
      // PostgreSQL의 ST_DWithin을 사용한 반경 검색
      const radiusInMeters = params.radius * 1000; // km를 m로 변환
      query = query.filter(
        `ST_DWithin(
          ST_MakePoint(longitude, latitude)::geography,
          ST_MakePoint(${params.longitude}, ${params.latitude})::geography,
          ${radiusInMeters}
        )`
      );
    }

    // 정렬 (위치 기반 검색이 있는 경우 거리순, 없으면 이름순)
    if (params.latitude && params.longitude) {
      query = query.order(
        `ST_Distance(
          ST_MakePoint(longitude, latitude)::geography,
          ST_MakePoint(${params.longitude}, ${params.latitude})::geography
        )`
      );
    } else {
      query = query.order("name");
    }

    // 페이지네이션
    if (params.limit) {
      query = query.limit(params.limit);
    }
    if (params.offset) {
      query = query.range(
        params.offset,
        params.offset + (params.limit || 10) - 1
      );
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`시장 검색 실패: ${error.message}`);
    }

    const total = count || 0;
    const hasMore = params.limit
      ? total > (params.offset || 0) + (params.limit || 10)
      : false;

    return {
      markets: data || [],
      total,
      hasMore,
    };
  } catch (error) {
    console.error("시장 검색 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 시장 생성
 * POST /api/markets
 */
export const createMarket = async (
  marketData: CreateMarketRequest
): Promise<Market> => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .insert([marketData])
      .select()
      .single();

    if (error) {
      throw new Error(`시장 생성 실패: ${error.message}`);
    }

    if (!data) {
      throw new Error("시장 생성 후 데이터를 가져올 수 없습니다.");
    }

    return data;
  } catch (error) {
    console.error("시장 생성 중 오류 발생:", error);
    throw error;
  }
};

/**
 * 시장 수정
 * PUT /api/markets/{marketId}
 */
export const updateMarket = async (
  marketId: number,
  updateData: UpdateMarketRequest
): Promise<Market> => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .update(updateData)
      .eq("market_id", marketId)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error(`수정할 시장을 찾을 수 없습니다: ${marketId}`);
      }
      throw new Error(`시장 수정 실패: ${error.message}`);
    }

    if (!data) {
      throw new Error(`수정된 시장 데이터를 가져올 수 없습니다: ${marketId}`);
    }

    return data;
  } catch (error) {
    console.error(`시장 ${marketId} 수정 중 오류 발생:`, error);
    throw error;
  }
};

/**
 * 시장 삭제
 * DELETE /api/markets/{marketId}
 */
export const deleteMarket = async (marketId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from("markets")
      .delete()
      .eq("market_id", marketId);

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error(`삭제할 시장을 찾을 수 없습니다: ${marketId}`);
      }
      throw new Error(`시장 삭제 실패: ${error.message}`);
    }
  } catch (error) {
    console.error(`시장 ${marketId} 삭제 중 오류 발생:`, error);
    throw error;
  }
};

/**
 * 시장 존재 여부 확인
 */
export const marketExists = async (marketId: number): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("markets")
      .select("market_id")
      .eq("market_id", marketId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  } catch (error) {
    return false;
  }
};
