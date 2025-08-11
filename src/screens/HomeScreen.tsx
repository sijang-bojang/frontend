import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-orange-500 px-4 py-6">
          <Text className="text-white text-2xl font-bold text-center">
            🏪 지역 시장에 오신 것을 환영합니다!
          </Text>
          <Text className="text-white text-center mt-2 opacity-90">
            신선한 먹거리와 따뜻한 인정이 가득한 곳
          </Text>
        </View>

        {/* 주요 정보 카드 */}
        <View className="px-4 py-6">
          <View className="bg-orange-50 rounded-lg p-4 mb-4">
            <Text className="text-lg font-semibold text-orange-800 mb-2">
              📅 오늘의 시장 정보
            </Text>
            <Text className="text-gray-700">
              • 운영시간: 오전 6시 - 오후 8시{"\n"}• 주차: 무료 (2시간){"\n"}•
              오늘의 특가 상품: 신선한 채소 20% 할인
            </Text>
          </View>

          <View className="bg-green-50 rounded-lg p-4 mb-4">
            <Text className="text-lg font-semibold text-green-800 mb-2">
              🌟 이번 주 이벤트
            </Text>
            <Text className="text-gray-700">
              • 시장 투어 체험 프로그램{"\n"}• 지역 특산품 시식회{"\n"}• 어린이
              요리 교실
            </Text>
          </View>

          <View className="bg-blue-50 rounded-lg p-4">
            <Text className="text-lg font-semibold text-blue-800 mb-2">
              💡 시장 이용 팁
            </Text>
            <Text className="text-gray-700">
              • 아침 일찍 가면 신선한 상품을 구할 수 있어요{"\n"}• 정기 고객은
              할인 혜택을 받을 수 있어요{"\n"}• 시장 상인들과 대화하며 정보를
              얻어보세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
