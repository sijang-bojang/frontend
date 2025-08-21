import { useState, useEffect } from "react";
import { Market } from "../../features/tour/types";
import { fetchMarkets } from "../api";
import { MARKETS } from "../../features/tour/data"; // 폴백 데이터

interface UseMarketsReturn {
  markets: Market[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMarkets = (): UseMarketsReturn => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMarkets();
      setMarkets(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "시장 데이터를 가져오는데 실패했습니다.";
      setError(errorMessage);
      console.error("useMarkets 훅 오류:", err);

      // API 실패 시 폴백 데이터 사용
      console.log("폴백 데이터를 사용합니다.");
      setMarkets(MARKETS);
      setError(null); // 폴백 데이터 사용 시 에러 상태 해제
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    markets,
    loading,
    error,
    refetch: fetchData,
  };
};
