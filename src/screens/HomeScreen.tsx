import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-white px-6 py-8 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            지역 시장
          </Text>
          <Text className="text-gray-600 text-base">
            신선한 먹거리와 따뜻한 인정이 가득한 곳
          </Text>
        </View>

        {/* 주요 정보 카드 */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              오늘의 시장 정보
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  운영시간: 오전 6시 - 오후 8시
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">주차: 무료 (2시간)</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  오늘의 특가: 신선한 채소 20% 할인
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              이번 주 이벤트
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <Text className="text-gray-700">시장 투어 체험 프로그램</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <Text className="text-gray-700">지역 특산품 시식회</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <Text className="text-gray-700">어린이 요리 교실</Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              시장 이용 팁
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  아침 일찍 가면 신선한 상품을 구할 수 있어요
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  정기 고객은 할인 혜택을 받을 수 있어요
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  시장 상인들과 대화하며 정보를 얻어보세요
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
