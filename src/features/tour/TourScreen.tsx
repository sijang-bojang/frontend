import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import IntroStep from "./components/IntroStep";
import RegionSelect from "./components/RegionSelect";
import FilterStep from "./components/FilterStep";
import TourPathScreen from "./TourPathScreen";
import TourCompleteModal from "./components/TourCompleteModal";
import { TourFilters, Market } from "./types";
import { useMarkets } from "../../shared/hooks/useMarkets";
import { recommendCourse, CourseRecommendResponse } from "../../shared/api";

export default function TourScreen() {
  const [step, setStep] = useState<"intro" | "region" | "filter" | "path">(
    "intro"
  );
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [courseData, setCourseData] = useState<CourseRecommendResponse | null>(
    null
  );
  const [showTourCompleteModal, setShowTourCompleteModal] = useState(false);
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
      console.log("🚀 AI 코스 추천 요청:", selectedMarket.marketId);

      const requestBody = {
        marketId: selectedMarket.marketId,
        marketName: selectedMarket.name,
        tags: [
          ...(filters.vehicle || []),
          ...(filters.companion || []),
          ...(filters.duration || []),
          ...(filters.theme || []),
        ],
      };

      console.log("📤 요청 Body:", JSON.stringify(requestBody, null, 2));

      const course = await recommendCourse(requestBody);

      console.log("✅ AI 코스 추천 응답:", JSON.stringify(course, null, 2));

      if (course) {
        console.log("📋 추천된 코스:", course.courseName);

        setCourseData(course);
        setShowTourCompleteModal(true); // 모달 표시
      } else {
        console.log("❌ 코스 추천을 받을 수 없습니다.");
      }
    } catch (error) {
      console.error("❌ AI 코스 추천 실패:", error);
    }
  };

  const handleBackFromPath = () => {
    setStep("filter");
    setCourseData(null);
  };

  const handleResetTour = () => {
    // 투어를 처음부터 다시 시작
    setStep("intro");
    setSelectedMarket(null);
    setCourseData(null);
    setShowTourCompleteModal(false);
  };

  const handleChallenge = () => {
    setShowTourCompleteModal(false);
    setStep("path");
  };

  const handleOtherChoice = () => {
    setShowTourCompleteModal(false);
    // 모달만 닫고 현재 필터 단계 유지
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      {step === "intro" ? (
        <IntroStep onStart={() => setStep("region")} />
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
            courseData={{
              courseId: courseData.courseId,
              marketId: selectedMarket.marketId,
              marketName: courseData.marketName,
              name: courseData.courseName,
              description: courseData.description,
              typeNames: [],
              spotCount: 0,
              courseSpots: [],
              isFamilyCourse: false,
              isCoupleCourse: false,
            }}
            onBack={handleBackFromPath}
            onReset={handleResetTour}
          />
        )
      ) : null}

      {/* 투어 생성 완료 모달 */}
      <TourCompleteModal
        visible={showTourCompleteModal}
        tourName={courseData?.courseName || ""}
        tourDescription={courseData?.description || ""}
        onChallenge={handleChallenge}
        onOtherChoice={handleOtherChoice}
      />
    </SafeAreaView>
  );
}
