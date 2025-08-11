import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourScreen() {
  const tourSpots = [
    {
      id: 1,
      name: "신선 채소 코너",
      description: "매일 아침 농가에서 직접 운반해오는 신선한 채소들",
      image: "🥬",
      duration: "15분",
      rating: 4.8,
      tips: "아침 8시 전에 가면 가장 신선한 채소를 구할 수 있어요",
    },
    {
      id: 2,
      name: "수산물 시장",
      description: "바다에서 갓 잡아온 신선한 수산물과 해산물",
      image: "🐟",
      duration: "20분",
      rating: 4.9,
      tips: "생선을 고를 때는 눈이 맑고 아가미가 붉은 것을 확인하세요",
    },
    {
      id: 3,
      name: "전통 시장 맛집거리",
      description: "할머니 손맛이 그대로 전해지는 전통 음식들",
      image: "🍜",
      duration: "30분",
      rating: 4.7,
      tips: "점심시간에는 손님이 많으니 미리 주문하는 것이 좋아요",
    },
    {
      id: 4,
      name: "공예품 상점",
      description: "지역 장인들이 만든 수제 공예품과 전통 소품",
      image: "🎨",
      duration: "25분",
      rating: 4.6,
      tips: "특별한 선물을 찾고 있다면 이곳을 추천해요",
    },
    {
      id: 5,
      name: "농산물 직거래장",
      description: "농부들이 직접 가져온 신선한 과일과 곡물",
      image: "🍎",
      duration: "20분",
      rating: 4.8,
      tips: "계절별로 다른 특산품을 맛볼 수 있어요",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-green-500 px-4 py-6">
          <Text className="text-white text-2xl font-bold text-center">
            🚶‍♂️ 시장 투어 가이드
          </Text>
          <Text className="text-white text-center mt-2 opacity-90">
            지역 시장의 모든 매력을 발견해보세요!
          </Text>
        </View>

        {/* 투어 정보 */}
        <View className="px-4 py-4">
          <View className="bg-green-100 rounded-lg p-4 mb-4">
            <Text className="text-center text-green-800 text-lg font-semibold">
              📍 추천 투어 코스
            </Text>
            <Text className="text-center text-green-600 mt-1">
              총 소요시간: 약 2시간 | 거리: 1.2km
            </Text>
          </View>
        </View>

        {/* 투어 스팟 목록 */}
        <View className="px-4 pb-6">
          {tourSpots.map((spot) => (
            <View key={spot.id} className="mb-4">
              <TouchableOpacity
                className="bg-white rounded-lg border border-gray-200 p-4"
                activeOpacity={0.7}
              >
                <View className="flex-row items-start">
                  <Text className="text-3xl mr-4">{spot.image}</Text>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-lg font-semibold text-gray-800">
                        {spot.name}
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-yellow-500 mr-1">⭐</Text>
                        <Text className="text-gray-600">{spot.rating}</Text>
                      </View>
                    </View>
                    <Text className="text-gray-600 mb-2">
                      {spot.description}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-green-600 font-medium">
                        ⏱️ {spot.duration}
                      </Text>
                      <Text className="text-blue-600 text-sm">
                        💡 {spot.tips}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 투어 팁 */}
        <View className="px-4 pb-6">
          <View className="bg-blue-50 rounded-lg p-4">
            <Text className="text-lg font-semibold text-blue-800 mb-2">
              🎯 투어 성공 팁
            </Text>
            <Text className="text-gray-700">
              • 편안한 신발을 착용하세요{"\n"}• 카메라를 준비하여 추억을
              남기세요{"\n"}• 현지인들과 대화하며 정보를 얻어보세요{"\n"}•
              계절별 특산품을 미리 확인해보세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
