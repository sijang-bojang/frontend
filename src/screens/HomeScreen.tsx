import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const marketNews = [
    {
      id: 1,
      title: "신선 채소 특가 이벤트",
      subtitle: "농가 직거래 신선 채소 30% 할인",
      date: "2025.01.15 ~ 2025.01.31",
      image: "🥬",
      category: "특가",
      color: "green",
    },
    {
      id: 2,
      title: "전통 시장 맛집 투어",
      subtitle: "할머니 손맛이 가득한 맛집 탐방",
      date: "2025.01.20 ~ 2025.01.25",
      image: "🍜",
      category: "투어",
      color: "orange",
    },
    {
      id: 3,
      title: "수산물 시식회",
      subtitle: "바다에서 갓 잡아온 신선한 수산물",
      date: "2025.01.22 ~ 2025.01.24",
      image: "🐟",
      category: "이벤트",
      color: "blue",
    },
  ];

  const quickInfo = [
    {
      id: 1,
      title: "운영시간",
      value: "06:00 - 20:00",
      color: "blue",
    },
    {
      id: 2,
      title: "주차",
      value: "무료 (2시간)",
      color: "green",
    },
    {
      id: 3,
      title: "오늘 날씨",
      value: "맑음 15°C",
      color: "yellow",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: "bg-green-500",
      blue: "bg-blue-500",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-white px-6 py-6 border-b border-gray-100">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-orange-500 rounded-lg mr-3 items-center justify-center">
                <Text className="text-white font-bold text-lg">시</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900">장소식</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg">⚙️</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            지역 시장 최신 소식
          </Text>
          <Text className="text-gray-600">
            신선한 먹거리와 따뜻한 인정이 가득한 시장의 소식을 전해드립니다
          </Text>
        </View>

        {/* 주요 시장 소식 */}
        <View className="px-6 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">
              최신 시장 소식
            </Text>
            <TouchableOpacity className="bg-orange-100 px-3 py-1 rounded-full">
              <Text className="text-orange-700 text-sm font-medium">
                더보기 →
              </Text>
            </TouchableOpacity>
          </View>

          {marketNews.map((news) => (
            <View key={news.id} className="mb-4">
              <TouchableOpacity
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                activeOpacity={0.8}
              >
                <View className="flex-row">
                  <View
                    className={`w-20 h-20 ${getColorClass(news.color)} items-center justify-center`}
                  >
                    <Text className="text-3xl">{news.image}</Text>
                  </View>
                  <View className="flex-1 p-4">
                    <View className="flex-row items-center mb-2">
                      <View
                        className={`px-2 py-1 rounded-full ${getColorClass(news.color)} mr-2`}
                      >
                        <Text className="text-white text-xs font-medium">
                          {news.category}
                        </Text>
                      </View>
                      <Text className="text-gray-500 text-xs">{news.date}</Text>
                    </View>
                    <Text className="text-lg font-semibold text-gray-900 mb-1">
                      {news.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {news.subtitle}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 빠른 정보 */}
        <View className="px-6 py-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            빠른 정보
          </Text>
          <View className="flex-row justify-between">
            {quickInfo.map((info) => (
              <View key={info.id} className="flex-1 mx-1">
                <TouchableOpacity
                  className="bg-white rounded-2xl p-4 items-center shadow-sm border border-gray-100"
                  activeOpacity={0.7}
                >
                  <View
                    className={`w-3 h-3 rounded-full mb-2 ${getColorClass(info.color)}`}
                  />
                  <Text className="text-gray-500 text-xs mb-1">
                    {info.title}
                  </Text>
                  <Text className="text-gray-900 font-semibold text-center">
                    {info.value}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* 시장 이용 팁 */}
        <View className="px-6 py-4">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              오늘의 시장 팁
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-start">
                <View className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                <Text className="text-gray-700 flex-1">
                  아침 8시 전에 가면 가장 신선한 채소를 구할 수 있어요
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3" />
                <Text className="text-gray-700 flex-1">
                  정기 고객은 할인 혜택을 받을 수 있어요
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3" />
                <Text className="text-gray-700 flex-1">
                  시장 상인들과 대화하며 정보를 얻어보세요
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 공지사항 */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900">공지사항</Text>
            <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
              <Text className="text-gray-600 text-lg">+</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="text-gray-700">
              [공지] 1월 20일부터 시장 내 화장실 공사가 진행됩니다. 이용에
              참고해 주세요.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
