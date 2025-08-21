import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <HeaderBar />
      <ScrollView className="flex-1">
        {/* 시장 소식 섹션 */}
        <View className="px-3 py-6 pb-18 mt-5 relative">
          {/* 타원형 배경 */}
          <View className="absolute inset-0 items-center justify-center -z-10">
            <LinearGradient
              colors={["#0F0D85", "#0F0D85", "#ffffff"]}
              locations={[0, 0.2, 0.8]}
              style={{
                width: 800,
                height: 330,
                borderTopLeftRadius: 400,
                borderTopRightRadius: 400,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                marginTop: 192,
              }}
            />
          </View>

          {/* 시장 소식 제목 */}
          <View className="mb-1 items-center">
            <View className="items-center relative">
              <Text className="text-2xl font-bold text-gray-900 relative z-10">
                시장 소식
              </Text>
              <View className="absolute mb-1 bottom-0 w-24 h-1.5 bg-[#0F0D85]/40 rounded-10" />
            </View>
            <Text className="text-gray-600 text-base text-center mt-1">
              시장과 근처 가게 관련 최근 소식을 알려드립니다.
            </Text>
          </View>

          {/* 시장 소식 카드 */}
          <MarketNewsCard />
        </View>

        <View className="mt-10">
          {/* 공지사항 */}
          <NoticesSection notices={notices} />
        </View>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
