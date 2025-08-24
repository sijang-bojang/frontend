import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import HeaderBar from "./components/HeaderBar";
import MarketNewsCard from "./components/HeroCarousel";
import NoticesSection from "./components/NoticesSection";
import { Notice } from "./types";

export default function HomeScreen() {
  const navigation = useNavigation();

  const notices: Notice[] = [
    { id: 1, text: "[행사] OX 퀴즈 참여 EVENT" },
    { id: 2, text: "[시장] 2025년 9월 대전 중앙시장 오일장 개최" },
  ];

  const handleAICourseRecommendation = () => {
    console.log("AI 코스 추천 버튼 클릭됨");
    navigation.navigate("Tour" as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <HeaderBar />
      <ScrollView className="flex-1">
        {/* 전통시장 투어 섹션 */}
        <View className="px-6 py-8 items-center">
          <Image
            source={require("../../assets/images/home_image.png")}
            className=" h-72 mt-20"
            resizeMode="contain"
          />

          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
              전통시장 투어
            </Text>
            <Text className="text-lg text-gray-700 text-center">
              소상공인들과 함께하는
            </Text>
            <Text className="text-lg text-gray-700 text-center">
              대전 로컬 전통시장 투어
            </Text>
            <Text className="text-lg text-gray-700 text-center mb-5">
              함께 해볼까요?
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center bg-white border border-black rounded-full px-4 py-2"
            activeOpacity={0.8}
            onPress={handleAICourseRecommendation}
          >
            <Text className="text-gray-900 font-light text-xl">
              AI 코스 추천 받기
            </Text>
          </TouchableOpacity>
        </View>
        {/* 홈 콘텐츠 이미지 섹션 */}
        <View className="pt-32 px-6 py-4 items-center pb-10">
          <Image
            source={require("../../assets/images/home_content.png")}
            className="h-[480px]"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
