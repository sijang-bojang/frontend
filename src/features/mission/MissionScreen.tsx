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
      color: "blue",
    },
    {
      id: 2,
      title: "지역 특산품 구매",
      description: "이 지역에서만 맛볼 수 있는 특산품을 구매해보세요",
      points: 200,
      completed: true,
      color: "green",
    },
    {
      id: 3,
      title: "상인과 대화하기",
      description: "시장 상인 3명과 대화하며 이야기를 나누어보세요",
      points: 150,
      completed: false,
      color: "purple",
    },
    {
      id: 4,
      title: "시장 맛집 방문",
      description: "시장 내 맛집 2곳을 방문하고 리뷰를 남겨주세요",
      points: 300,
      completed: false,
      color: "orange",
    },
    {
      id: 5,
      title: "친환경 쇼핑",
      description: "장바구니를 사용하여 플라스틱 봉투 사용을 줄여보세요",
      points: 80,
      completed: false,
      color: "teal",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      teal: "bg-teal-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1">
        {/* 헤더 */}
        <View className="bg-white px-6 py-8 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            시장 미션
          </Text>
          <Text className="text-gray-600 text-base">
            미션을 완료하고 포인트를 모아보세요
          </Text>
        </View>

        {/* 포인트 요약 */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <Text className="text-center text-gray-900 text-lg font-semibold mb-2">
              현재 포인트
            </Text>
            <Text className="text-center text-3xl font-bold text-purple-600 mb-2">
              200점
            </Text>
            <Text className="text-center text-gray-500 text-sm">
              다음 등급까지 300점 더 필요
            </Text>
          </View>
        </View>

        {/* 미션 목록 */}
        <View className="px-6 pb-6">
          {missions.map((mission) => (
            <View key={mission.id} className="mb-4">
              <TouchableOpacity
                className={`p-6 rounded-2xl border ${
                  mission.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                } shadow-sm`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-row items-start flex-1">
                    <View
                      className={`w-3 h-3 rounded-full mt-2 mr-4 ${getColorClass(mission.color)}`}
                    />
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text
                          className={`text-lg font-semibold ${
                            mission.completed
                              ? "text-green-800"
                              : "text-gray-900"
                          }`}
                        >
                          {mission.title}
                        </Text>
                        <View
                          className={`px-3 py-1 rounded-full ${
                            mission.completed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          <Text
                            className={`text-sm font-medium ${
                              mission.completed
                                ? "text-green-700"
                                : "text-gray-600"
                            }`}
                          >
                            {mission.points}점
                          </Text>
                        </View>
                      </View>
                      <Text
                        className={`${
                          mission.completed ? "text-green-700" : "text-gray-600"
                        } mb-3`}
                      >
                        {mission.description}
                      </Text>
                      {mission.completed && (
                        <View className="bg-green-100 px-3 py-1 rounded-full self-start">
                          <Text className="text-green-700 text-sm font-medium">
                            완료
                          </Text>
                        </View>
                      )}
                    </View>
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
