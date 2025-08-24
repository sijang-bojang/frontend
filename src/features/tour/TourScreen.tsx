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
import {
  recommendCourse,
  CourseRecommendResponse,
  startUserCourse,
} from "../../shared/api";

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
      return;
    }

    try {
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

      const course = await recommendCourse(requestBody);

      if (course) {
        setCourseData(course);
        setShowTourCompleteModal(true); // 모달 표시
      }
    } catch (error) {
      // 에러 처리 (로그 없이)
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

  const handleChallenge = async () => {
    if (!courseData) {
      return;
    }

    try {
      // 임시로 사용자 ID를 1로 설정 (추후 인증 시스템과 연동)
      const userId = 1;

      // 사용자에게 코스 등록
      await startUserCourse(userId, courseData.courseId);

      setShowTourCompleteModal(false);
      setStep("path");
    } catch (error) {
      console.error("코스 등록 실패:", error);
      // 에러가 발생해도 일단 화면은 전환
      setShowTourCompleteModal(false);
      setStep("path");
    }
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
