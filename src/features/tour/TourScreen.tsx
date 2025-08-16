import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";
import FilterStep from "./components/FilterStep";
import { Market, TourFilters } from "./types";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region" | "filter">("intro");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const daejeonRegions = ["유성구", "서구", "중구", "동구", "대덕구"];

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
    <SafeAreaView className="flex-1 bg-gray-50">
      {step === "intro" ? (
        <ScrollView className="flex-1">
          <IntroStep onStart={() => setStep("region")} />
          <View className="h-10" />
        </ScrollView>
      ) : step === "region" ? (
        <RegionSelect
          regions={daejeonRegions}
          onSelect={handleMarketSelect}
          onBack={() => setStep("intro")}
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
