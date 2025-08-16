import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";
import FilterStep from "./components/FilterStep";
import { TourFilters, Market } from "./types";
import { getAllMarkets } from "../../shared/api";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region" | "filter">("intro");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API에서 시장 데이터 가져오기
  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiMarkets = await getAllMarkets();

      // API 데이터를 TourScreen에서 사용하는 Market 타입으로 변환
      const transformedMarkets: Market[] = apiMarkets.map((apiMarket) => {
        // address에서 지역 추출 (예: "대전광역시 유성구 ..." -> "유성구")
        const addressParts = apiMarket.address.split(" ");
        const region = addressParts.length > 1 ? addressParts[1] : "기타";

        return {
          id: apiMarket.market_id,
          name: apiMarket.name,
          region: region,
          fullRegion: apiMarket.address,
        };
      });

      setMarkets(transformedMarkets);
    } catch (err) {
      console.error("시장 데이터 가져오기 실패:", err);
      setError(
        err instanceof Error ? err.message : "시장 데이터를 가져올 수 없습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 고유한 지역 목록 추출 (중복 제거)
  const uniqueRegions = React.useMemo(() => {
    const regions = markets.map((market) => market.region);
    return Array.from(new Set(regions)).sort();
  }, [markets]);

  const handleMarketSelect = (market: Market) => {
    setSelectedMarket(market);
    setStep("filter");
  };

  const handleStartTour = (filters: TourFilters) => {
    // TODO: 투어 시작 로직 구현
    console.log("투어 시작:", { market: selectedMarket, filters });
    // 여기에 실제 투어 시작 로직을 추가할 수 있습니다
  };

  // 에러가 있는 경우 표시
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <View className="p-4">
          <Text className="text-red-500 text-center text-lg mb-4">{error}</Text>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={fetchMarkets}
          >
            <Text className="text-white text-center">다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {step === "intro" ? (
        <ScrollView className="flex-1">
          <IntroStep onStart={() => setStep("region")} />
          <View className="h-10" />
        </ScrollView>
      ) : step === "region" ? (
        <RegionSelect
          regions={uniqueRegions}
          markets={markets}
          onSelect={handleMarketSelect}
          onBack={() => setStep("intro")}
          loading={loading}
        />
      ) : (
        selectedMarket && (
          <FilterStep
            selectedMarket={selectedMarket}
            onBack={() => setStep("region")}
            onStartTour={handleStartTour}
          />
        )
      )}
    </SafeAreaView>
  );
}
