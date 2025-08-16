import { supabase } from "../lib/supabase";

export interface Spot {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  location_lat: number;
  location_lng: number;
  created_at: string;
  updated_at: string;
}

export interface SpotResponse {
  data: Spot | null;
  error: string | null;
}

export interface SpotsResponse {
  data: Spot[] | null;
  error: string | null;
}

/**
 * ID를 기반으로 단일 spot을 조회합니다.
 * @param id - 조회할 spot의 ID
 * @returns SpotResponse - spot 데이터 또는 에러 정보
 */
export async function getSpotById(id: number): Promise<SpotResponse> {
  try {
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Spot 조회 에러:", error);
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: data as Spot,
      error: null,
    };
  } catch (error) {
    console.error("Spot 조회 중 예외 발생:", error);
    return {
      data: null,
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
}

/**
 * 모든 spots를 조회합니다.
 * @returns SpotsResponse - spots 배열 또는 에러 정보
 */
export async function getAllSpots(): Promise<SpotsResponse> {
  try {
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .order("name");

    if (error) {
      console.error("Spots 조회 에러:", error);
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: data as Spot[],
      error: null,
    };
  } catch (error) {
    console.error("Spots 조회 중 예외 발생:", error);
    return {
      data: null,
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
}

/**
 * 특정 지역의 spots를 조회합니다.
 * @param region - 조회할 지역명
 * @returns SpotsResponse - spots 배열 또는 에러 정보
 */
export async function getSpotsByRegion(region: string): Promise<SpotsResponse> {
  try {
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .ilike("name", `%${region}%`)
      .order("name");

    if (error) {
      console.error("지역별 spots 조회 에러:", error);
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: data as Spot[],
      error: null,
    };
  } catch (error) {
    console.error("지역별 spots 조회 중 예외 발생:", error);
    return {
      data: null,
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
}

/**
 * 새로운 spot을 생성합니다.
 * @param spot - 생성할 spot 데이터
 * @returns SpotResponse - 생성된 spot 또는 에러 정보
 */
export async function createSpot(
  spot: Omit<Spot, "id" | "created_at" | "updated_at">
): Promise<SpotResponse> {
  try {
    const { data, error } = await supabase
      .from("spots")
      .insert([spot])
      .select()
      .single();

    if (error) {
      console.error("Spot 생성 에러:", error);
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: data as Spot,
      error: null,
    };
  } catch (error) {
    console.error("Spot 생성 중 예외 발생:", error);
    return {
      data: null,
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
}

/**
 * 기존 spot을 업데이트합니다.
 * @param id - 업데이트할 spot의 ID
 * @param updates - 업데이트할 데이터
 * @returns SpotResponse - 업데이트된 spot 또는 에러 정보
 */
export async function updateSpot(
  id: number,
  updates: Partial<Omit<Spot, "id" | "created_at" | "updated_at">>
): Promise<SpotResponse> {
  try {
    const { data, error } = await supabase
      .from("spots")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Spot 업데이트 에러:", error);
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: data as Spot,
      error: null,
    };
  } catch (error) {
    console.error("Spot 업데이트 중 예외 발생:", error);
    return {
      data: null,
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
}

/**
 * spot을 삭제합니다.
 * @param id - 삭제할 spot의 ID
 * @returns SpotResponse - 삭제 성공 여부 또는 에러 정보
 */
export async function deleteSpot(
  id: number
): Promise<{ data: boolean | null; error: string | null }> {
  try {
    const { error } = await supabase.from("spots").delete().eq("id", id);

    if (error) {
      console.error("Spot 삭제 에러:", error);
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: true,
      error: null,
    };
  } catch (error) {
    console.error("Spot 삭제 중 예외 발생:", error);
    return {
      data: null,
      error: "알 수 없는 에러가 발생했습니다.",
    };
  }
}
