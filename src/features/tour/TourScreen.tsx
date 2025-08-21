import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";
import FilterStep from "./components/FilterStep";
import TourPathScreen from "./components/TourPathScreen";
import { TourFilters, Market } from "./types";
import { useMarkets } from "../../shared/hooks/useMarkets";
import { fetchCoursesByMarket, Course } from "../../shared/api";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region" | "filter" | "path">(
    "intro"
  );
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);
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

  const handleStartTour = async (filters: TourFilters) => {
    if (!selectedMarket) {
      console.log("선택된 시장이 없습니다.");
      return;
    }

    try {
      console.log("🚀 시장별 코스 조회 요청:", selectedMarket.marketId);

      const courses = await fetchCoursesByMarket(selectedMarket.marketId);

      console.log(
        "✅ 시장별 코스 조회 응답:",
        JSON.stringify(courses, null, 2)
      );

      if (courses.length > 0) {
        // 첫 번째 코스 선택
        const firstCourse = courses[0];
        console.log("📋 선택된 코스:", firstCourse.name);

        setCourseData(firstCourse);
        setStep("path");
      } else {
        console.log("❌ 해당 시장에 코스가 없습니다.");
      }
    } catch (error) {
      console.error("❌ 시장별 코스 조회 실패:", error);
    }
  };

  const handleBackFromPath = () => {
    setStep("filter");
    setCourseData(null);
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
      ) : step === "filter" ? (
        selectedMarket && (
          <FilterStep
            selectedMarket={selectedMarket}
            onBack={() => setStep("region")}
            onStartTour={handleStartTour}
          />
        )
      ) : step === "path" ? (
        selectedMarket &&
        courseData && (
          <TourPathScreen
            selectedMarket={selectedMarket}
            courseData={courseData}
            onBack={handleBackFromPath}
          />
        )
      ) : null}
    </SafeAreaView>
  );
}
