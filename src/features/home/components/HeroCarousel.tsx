import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MarketNewsCard: React.FC = () => {
  return (
    <View className="px-5 py-6">
      {/* 시장 소식 제목 */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">시장 소식</Text>
        <Text className="text-gray-600 text-base">
          시장과 근처 가게 관련 최근 소식을 알려드립니다.
        </Text>
      </View>

      {/* 시장 소식 카드 */}
      <TouchableOpacity
        className="bg-blue-500 rounded-2xl overflow-hidden"
        activeOpacity={0.9}
      >
        {/* 이미지 영역 (비워둠) */}
        <View className="w-full h-48 bg-blue-400 items-center justify-center">
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-white text-2xl">📸</Text>
          </View>
        </View>

        {/* 카드 내용 */}
        <View className="p-5">
          <Text className="text-blue-100 text-sm font-medium mb-2">
            신탄진시장
          </Text>
          <Text className="text-white text-lg font-semibold mb-4">
            [NEW OPEN!] 새로운 반찬가게가 생겼어요
          </Text>

          {/* 더보기 버튼 */}
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-medium">더보기 →</Text>
            <View className="w-6 h-6 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-white text-sm">→</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MarketNewsCard;
