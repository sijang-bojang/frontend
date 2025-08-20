import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "./components/HeaderBar";
import MarketNewsCard from "./components/HeroCarousel";
import NoticesSection from "./components/NoticesSection";
import { Notice } from "./types";

export default function HomeScreen() {
  const notices: Notice[] = [
    { id: 1, text: "[행사] OX 퀴즈 참여 EVENT" },
    { id: 2, text: "[시장] 2025년 9월 대전 중앙시장 오일장 개최" },
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <HeaderBar />
      <ScrollView className="flex-1">
        {/* 시장 소식 */}
        <MarketNewsCard />

        {/* 공지사항 */}
        <NoticesSection notices={notices} />

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
