import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const userStats = {
    totalVisits: 15,
    totalPoints: 1250,
    completedMissions: 8,
    totalMissions: 12,
    favoriteMarkets: 3,
    memberSince: "2024년 1월",
  };

  const achievements = [
    {
      id: 1,
      name: "첫 방문",
      description: "시장에 처음 방문했습니다",
      color: "blue",
      unlocked: true,
      date: "2024.01.15",
    },
    {
      id: 2,
      name: "미션 마스터",
      description: "10개의 미션을 완료했습니다",
      color: "purple",
      unlocked: true,
      date: "2024.02.20",
    },
    {
      id: 3,
      name: "정기 고객",
      description: "한 달에 5번 이상 방문했습니다",
      color: "green",
      unlocked: true,
      date: "2024.02.28",
    },
    {
      id: 4,
      name: "시장 탐험가",
      description: "모든 구역을 탐방했습니다",
      color: "orange",
      unlocked: false,
      date: null,
    },
    {
      id: 5,
      name: "지역 특산품 수집가",
      description: "20가지 지역 특산품을 구매했습니다",
      color: "teal",
      unlocked: false,
      date: null,
    },
  ];

  const menuItems = [
    {
      id: 1,
      title: "방문 기록",
      description: "지금까지 방문한 시장 기록",
      color: "blue",
    },
    {
      id: 2,
      title: "즐겨찾기",
      description: "마음에 드는 상점과 맛집",
      color: "yellow",
    },
    {
      id: 3,
      title: "포인트 내역",
      description: "적립 및 사용 내역 확인",
      color: "green",
    },
    {
      id: 4,
      title: "설정",
      description: "앱 설정 및 개인정보 관리",
      color: "gray",
    },
    {
      id: 5,
      title: "고객센터",
      description: "문의사항 및 도움말",
      color: "purple",
    },
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      teal: "bg-teal-500",
      yellow: "bg-yellow-500",
      gray: "bg-gray-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* 프로필 헤더 */}
        <View className="bg-white px-6 py-8 border-b border-gray-100">
          <View className="items-center">
            <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-4">
              <Text className="text-2xl text-gray-600">사용자</Text>
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-1">
              시장 애호가
            </Text>
            <Text className="text-gray-500">
              {userStats.memberSince}부터 활동중
            </Text>
          </View>
        </View>

        {/* 통계 정보 */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-4 text-center">
              나의 활동 통계
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-blue-600">
                  {userStats.totalVisits}
                </Text>
                <Text className="text-gray-500 text-sm">총 방문</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-purple-600">
                  {userStats.totalPoints}
                </Text>
                <Text className="text-gray-500 text-sm">포인트</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-green-600">
                  {userStats.completedMissions}/{userStats.totalMissions}
                </Text>
                <Text className="text-gray-500 text-sm">미션 완료</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 업적 */}
        <View className="px-6 py-2">
          <Text className="text-xl font-bold text-gray-900 mb-4">업적</Text>
          {achievements.map((achievement) => (
            <View key={achievement.id} className="mb-4">
              <TouchableOpacity
                className={`p-6 rounded-2xl border-2 ${
                  achievement.unlocked
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-200"
                } shadow-sm`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-3 h-3 rounded-full mr-4 ${getColorClass(achievement.color)}`}
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text
                        className={`text-lg font-semibold ${
                          achievement.unlocked
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {achievement.name}
                      </Text>
                      {achievement.unlocked && (
                        <Text className="text-gray-500 text-sm">
                          {achievement.date}
                        </Text>
                      )}
                    </View>
                    <Text
                      className={`${
                        achievement.unlocked ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {achievement.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 메뉴 */}
        <View className="px-6 py-2">
          <Text className="text-xl font-bold text-gray-900 mb-4">메뉴</Text>
          {menuItems.map((item) => (
            <View key={item.id} className="mb-4">
              <TouchableOpacity
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-3 h-3 rounded-full mr-4 ${getColorClass(item.color)}`}
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {item.description}
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-xl">›</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* 앱 정보 */}
        <View className="px-6 py-6">
          <View className="bg-gray-50 rounded-2xl p-6">
            <Text className="text-center text-gray-500 text-sm">
              지역 시장 홍보 앱 v1.0.0{"\n"}더 나은 시장 경험을 제공합니다
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
