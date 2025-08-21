import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";
import FilterStep from "./components/FilterStep";
import { TourFilters, Market } from "./types";
import { useMarkets } from "../../shared/hooks/useMarkets";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region" | "filter">("intro");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const { markets, loading, error } = useMarkets();

  // 고유한 지역 목록 추출 (중복 제거) - 주소에서 지역 추출
  const uniqueRegions = React.useMemo(() => {
    const regions = markets.map((market) => {
      // 주소에서 구 단위 추출 (예: "대전광역시 동구" -> "동구")
      const match = market.address.match(/대전광역시\s+([^\s]+)/);
      return match ? match[1] : "기타";
    });
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

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
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
