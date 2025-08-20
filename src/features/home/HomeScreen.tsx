import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "./components/HeaderBar";
import HeroCarousel from "./components/HeroCarousel";
import NoticesSection from "./components/NoticesSection";
import QuickActions from "./components/QuickActions";
import TodaySummary from "./components/TodaySummary";
import { HeroCard, Notice } from "./types";

export default function HomeScreen() {
  const heroCards: HeroCard[] = [
    {
      id: 1,
      title: "이번주 시장 이벤트",
      description: "시식회, 특가 행사, 공연 일정 확인",
      colorClass: "bg-indigo-500",
      ctaText: "자세히 보기",
    },
    {
      id: 2,
      title: "근처 맛집 추천",
      description: "시장 앞 골목 베스트 맛집 5",
      colorClass: "bg-teal-500",
      ctaText: "투어 보기",
    },
    {
      id: 3,
      title: "오늘의 미션",
      description: "미션 수행하고 포인트 받기",
      colorClass: "bg-rose-500",
      ctaText: "시작하기",
    },
  ];

  const notices: Notice[] = [
    { id: 1, text: "[공지] 1/20 시장 화장실 공사 안내" },
    { id: 2, text: "[미션] 설맞이 스탬프 랠리 참여" },
    { id: 3, text: "[이벤트] 사은품 증정 행사" },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <HeaderBar />
      <ScrollView className="flex-1">
        {/* 상단 히어로 캐러셀 */}
        <HeroCarousel cards={heroCards} cardHeight={160} />

        {/* 퀵 액션 */}
        <QuickActions />

        {/* 오늘의 요약 */}
        <TodaySummary
          items={[
            {
              id: 1,
              label: "운영시간",
              value: "06:00 - 20:00",
              dotClass: "bg-indigo-500",
            },
            {
              id: 2,
              label: "주차",
              value: "무료 (2시간)",
              dotClass: "bg-teal-500",
            },
            {
              id: 3,
              label: "날씨",
              value: "맑음 15°C",
              dotClass: "bg-rose-500",
            },
          ]}
        />

        {/* 공지사항 */}
        <NoticesSection notices={notices} />

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
