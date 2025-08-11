import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourScreen() {
  const tourSpots = [
    {
      id: 1,
      name: "신선 채소 코너",
      description: "매일 아침 농가에서 직접 운반해오는 신선한 채소들",
      duration: "15분",
      rating: 4.8,
      tips: "아침 8시 전에 가면 가장 신선한 채소를 구할 수 있어요",
      color: "green",
    },
    {
      id: 2,
      name: "수산물 시장",
      description: "바다에서 갓 잡아온 신선한 수산물과 해산물",
      duration: "20분",
      rating: 4.9,
      tips: "생선을 고를 때는 눈이 맑고 아가미가 붉은 것을 확인하세요",
      color: "blue",
    },
    {
      id: 3,
      name: "전통 시장 맛집거리",
      description: "할머니 손맛이 그대로 전해지는 전통 음식들",
      duration: "30분",
      rating: 4.7,
      tips: "점심시간에는 손님이 많으니 미리 주문하는 것이 좋아요",
      color: "orange",
    },
    {
      id: 4,
      name: "공예품 상점",
      description: "지역 장인들이 만든 수제 공예품과 전통 소품",
      duration: "25분",
      rating: 4.6,
      tips: "특별한 선물을 찾고 있다면 이곳을 추천해요",
      color: "purple",
    },
    {
      id: 5,
      name: "농산물 직거래장",
      description: "농부들이 직접 가져온 신선한 과일과 곡물",
      duration: "20분",
      rating: 4.8,
      tips: "계절별로 다른 특산품을 맛볼 수 있어요",
      color: "teal",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      teal: "bg-teal-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-white px-6 py-8 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            시장 투어 가이드
          </Text>
          <Text className="text-gray-600 text-base">
            지역 시장의 모든 매력을 발견해보세요
          </Text>
        </View>

        {/* 투어 정보 */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <Text className="text-center text-gray-900 text-lg font-semibold mb-2">
              추천 투어 코스
            </Text>
            <View className="flex-row justify-center space-x-8">
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">2시간</Text>
                <Text className="text-gray-500 text-sm">소요시간</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">1.2km</Text>
                <Text className="text-gray-500 text-sm">거리</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 투어 스팟 목록 */}
        <View className="px-6 pb-6">
          {tourSpots.map((spot) => (
            <View key={spot.id} className="mb-4">
              <TouchableOpacity
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                activeOpacity={0.7}
              >
                <View className="flex-row items-start">
                  <View
                    className={`w-3 h-3 rounded-full mt-2 mr-4 ${getColorClass(spot.color)}`}
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-lg font-semibold text-gray-900">
                        {spot.name}
                      </Text>
                      <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <Text className="text-yellow-600 text-sm font-medium">
                          {spot.rating}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-gray-600 mb-3">
                      {spot.description}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-600 text-sm font-medium">
                          {spot.duration}
                        </Text>
                      </View>
                      <Text className="text-gray-500 text-sm flex-1 ml-3">
                        {spot.tips}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 투어 팁 */}
        <View className="px-6 pb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              투어 성공 팁
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">편안한 신발을 착용하세요</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  카메라를 준비하여 추억을 남기세요
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  현지인들과 대화하며 정보를 얻어보세요
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-700">
                  계절별 특산품을 미리 확인해보세요
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
