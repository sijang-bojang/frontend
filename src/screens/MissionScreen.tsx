import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MissionScreen() {
  const missions = [
    {
      id: 1,
      title: "시장 탐방하기",
      description: "시장의 모든 구역을 돌아보고 사진을 찍어주세요",
      points: 100,
      completed: false,
      icon: "🚶‍♂️",
    },
    {
      id: 2,
      title: "지역 특산품 구매",
      description: "이 지역에서만 맛볼 수 있는 특산품을 구매해보세요",
      points: 200,
      completed: true,
      icon: "🛍️",
    },
    {
      id: 3,
      title: "상인과 대화하기",
      description: "시장 상인 3명과 대화하며 이야기를 나누어보세요",
      points: 150,
      completed: false,
      icon: "💬",
    },
    {
      id: 4,
      title: "시장 맛집 방문",
      description: "시장 내 맛집 2곳을 방문하고 리뷰를 남겨주세요",
      points: 300,
      completed: false,
      icon: "🍜",
    },
    {
      id: 5,
      title: "친환경 쇼핑",
      description: "장바구니를 사용하여 플라스틱 봉투 사용을 줄여보세요",
      points: 80,
      completed: false,
      icon: "🌱",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-purple-500 px-4 py-6">
          <Text className="text-white text-2xl font-bold text-center">
            🎯 시장 미션
          </Text>
          <Text className="text-white text-center mt-2 opacity-90">
            미션을 완료하고 포인트를 모아보세요!
          </Text>
        </View>

        {/* 포인트 요약 */}
        <View className="px-4 py-4">
          <View className="bg-purple-100 rounded-lg p-4 mb-4">
            <Text className="text-center text-purple-800 text-lg font-semibold">
              현재 포인트: 200점
            </Text>
            <Text className="text-center text-purple-600 mt-1">
              다음 등급까지 300점 더 필요
            </Text>
          </View>
        </View>

        {/* 미션 목록 */}
        <View className="px-4 pb-6">
          {missions.map((mission) => (
            <View key={mission.id} className="mb-4">
              <TouchableOpacity
                className={`p-4 rounded-lg border-2 ${
                  mission.completed
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-gray-200"
                }`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{mission.icon}</Text>
                    <View className="flex-1">
                      <Text
                        className={`text-lg font-semibold ${
                          mission.completed ? "text-green-800" : "text-gray-800"
                        }`}
                      >
                        {mission.title}
                      </Text>
                      <Text className="text-gray-600 mt-1">
                        {mission.description}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text
                      className={`text-lg font-bold ${
                        mission.completed ? "text-green-600" : "text-purple-600"
                      }`}
                    >
                      {mission.points}점
                    </Text>
                    {mission.completed && (
                      <Text className="text-green-600 text-sm">완료!</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
