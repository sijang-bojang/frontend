import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  const marketAreas = [
    {
      id: 1,
      name: "채소/과일 구역",
      location: "A구역 (입구에서 가까운 곳)",
      description: "신선한 채소와 과일을 구할 수 있는 구역",
      icon: "🥬",
      status: "open",
      popularItems: ["신선 채소", "계절 과일", "건강 식재료"],
    },
    {
      id: 2,
      name: "수산물 구역",
      location: "B구역 (중앙부)",
      description: "바다에서 갓 잡아온 신선한 수산물",
      icon: "🐟",
      status: "open",
      popularItems: ["생선", "새우", "게", "조개류"],
    },
    {
      id: 3,
      name: "육류 구역",
      location: "C구역 (서쪽)",
      description: "엄선된 육류와 가공육",
      icon: "🥩",
      status: "open",
      popularItems: ["소고기", "돼지고기", "닭고기", "양고기"],
    },
    {
      id: 4,
      name: "전통시장 맛집거리",
      location: "D구역 (동쪽)",
      description: "할머니 손맛이 가득한 전통 음식",
      icon: "🍜",
      status: "open",
      popularItems: ["국수", "떡볶이", "순대", "빈대떡"],
    },
    {
      id: 5,
      name: "공예품/기념품",
      location: "E구역 (북쪽)",
      description: "지역 특색이 담긴 공예품과 기념품",
      icon: "🎨",
      status: "open",
      popularItems: ["수제 공예품", "전통 소품", "기념품"],
    },
    {
      id: 6,
      name: "주차장",
      location: "시장 서쪽",
      description: "무료 주차 (2시간)",
      icon: "🅿️",
      status: "open",
      popularItems: ["무료 주차", "2시간 제한"],
    },
  ];

  const nearbyPlaces = [
    {
      id: 1,
      name: "시장 공용 화장실",
      distance: "50m",
      icon: "🚻",
    },
    {
      id: 2,
      name: "ATM기",
      distance: "100m",
      icon: "🏧",
    },
    {
      id: 3,
      name: "버스 정류장",
      distance: "200m",
      icon: "🚌",
    },
    {
      id: 4,
      name: "지하철역",
      distance: "500m",
      icon: "🚇",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-blue-500 px-4 py-6">
          <Text className="text-white text-2xl font-bold text-center">
            🗺️ 시장 지도
          </Text>
          <Text className="text-white text-center mt-2 opacity-90">
            시장의 모든 구역과 편의시설을 한눈에!
          </Text>
        </View>

        {/* 시장 개요 */}
        <View className="px-4 py-4">
          <View className="bg-blue-100 rounded-lg p-4 mb-4">
            <Text className="text-center text-blue-800 text-lg font-semibold">
              📍 시장 정보
            </Text>
            <Text className="text-center text-blue-600 mt-1">
              주소: 지역시 시장로 123 | 운영시간: 06:00-20:00
            </Text>
          </View>
        </View>

        {/* 시장 구역 */}
        <View className="px-4 py-2">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            🏪 시장 구역 안내
          </Text>
          {marketAreas.map((area) => (
            <View key={area.id} className="mb-3">
              <TouchableOpacity
                className="bg-white rounded-lg border border-gray-200 p-4"
                activeOpacity={0.7}
              >
                <View className="flex-row items-start">
                  <Text className="text-2xl mr-3">{area.icon}</Text>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-lg font-semibold text-gray-800">
                        {area.name}
                      </Text>
                      <View
                        className={`px-2 py-1 rounded-full ${
                          area.status === "open" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            area.status === "open"
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {area.status === "open" ? "영업중" : "휴무"}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-gray-600 text-sm mb-1">
                      📍 {area.location}
                    </Text>
                    <Text className="text-gray-700 mb-2">
                      {area.description}
                    </Text>
                    <View className="flex-row flex-wrap">
                      {area.popularItems.map((item, index) => (
                        <View
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-full mr-2 mb-1"
                        >
                          <Text className="text-xs text-gray-600">{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 주변 편의시설 */}
        <View className="px-4 py-2">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            🏢 주변 편의시설
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {nearbyPlaces.map((place) => (
              <View key={place.id} className="w-[48%] mb-3">
                <TouchableOpacity
                  className="bg-gray-50 rounded-lg border border-gray-200 p-3"
                  activeOpacity={0.7}
                >
                  <View className="items-center">
                    <Text className="text-2xl mb-2">{place.icon}</Text>
                    <Text className="text-sm font-medium text-gray-800 text-center mb-1">
                      {place.name}
                    </Text>
                    <Text className="text-xs text-gray-600">
                      📏 {place.distance}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* 이용 팁 */}
        <View className="px-4 py-4">
          <View className="bg-yellow-50 rounded-lg p-4">
            <Text className="text-lg font-semibold text-yellow-800 mb-2">
              💡 지도 이용 팁
            </Text>
            <Text className="text-gray-700">
              • 각 구역을 터치하면 상세 정보를 볼 수 있어요{"\n"}• 주차장은 시장
              서쪽에 위치해 있어요{"\n"}• 화장실과 ATM은 시장 중앙에 있어요
              {"\n"}• 버스와 지하철로도 쉽게 접근할 수 있어요
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
