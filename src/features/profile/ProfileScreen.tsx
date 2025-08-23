import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "../../shared/stores/userStore";

export default function ProfileScreen() {
  const { currentUser, isLoading, error, loginAsUser } = useUserStore();

  // 컴포넌트 마운트 시 사용자 ID 1번으로 로그인 (테스트용)
  useEffect(() => {
    if (!currentUser) {
      loginAsUser(1);
    }
  }, [currentUser, loginAsUser]);

  const completedTours = [
    {
      id: 1,
      name: "달콤한 탈출",
      icon: require("../../assets/images/tous_icons/donut.png"),
    },
    {
      id: 2,
      name: "흥정의 기술",
      icon: require("../../assets/images/tous_icons/nego.png"),
    },
  ];

  // 로딩 중일 때
  if (isLoading) {
    return (
      <SafeAreaView
        className="flex-1 bg-white"
        edges={["top", "left", "right"]}
      >
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4">
            사용자 정보를 불러오는 중...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <SafeAreaView
        className="flex-1 bg-white"
        edges={["top", "left", "right"]}
      >
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle" size={64} color="#EF4444" />
          <Text className="text-red-500 text-lg font-semibold mt-4 mb-2">
            오류가 발생했습니다
          </Text>
          <Text className="text-gray-600 text-center mb-4">{error}</Text>
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg"
            onPress={() => loginAsUser(1)}
          >
            <Text className="text-white font-semibold">다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 사용자 정보가 없을 때
  if (!currentUser) {
    return (
      <SafeAreaView
        className="flex-1 bg-white"
        edges={["top", "left", "right"]}
      >
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">
            사용자 정보를 불러올 수 없습니다.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView className="flex-1">
        {/* 사용자 프로필 */}
        <View className="px-6 py-6">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="person" size={32} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900 mb-1">
                {currentUser.username}
              </Text>
              <View className="bg-gray-100 rounded-full px-3 py-1 self-start">
                <Text className="text-sm text-gray-600">
                  Lv.{currentUser.level}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 포인트 섹션 */}
        <View className="px-6 mb-6">
          <TouchableOpacity className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center">
            <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">P</Text>
            </View>
            <Text className="flex-1 text-gray-900">지금까지 모은 포인트</Text>
            <Text className="text-blue-500 font-semibold mr-2">
              {currentUser.rewardPoints.toLocaleString()}P
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* 경험치 섹션 */}
        <View className="px-6 mb-6">
          <TouchableOpacity className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center">
            <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">XP</Text>
            </View>
            <Text className="flex-1 text-gray-900">현재 경험치</Text>
            <Text className="text-green-500 font-semibold mr-2">
              {currentUser.exp.toLocaleString()} XP
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* 찜한 시장/가게 */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-lg border border-gray-200 p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">
                내가 찜한 시장/가게
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-500">더보기 &gt;</Text>
              </TouchableOpacity>
            </View>
            <View className="h-32 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center">
              <Ionicons name="add-circle-outline" size={48} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* 완주한 투어 */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-lg border border-gray-200 p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">
                내가 완주한 투어
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-500">더보기 &gt;</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center space-x-8">
              {completedTours.map((tour) => (
                <View key={tour.id} className="items-center">
                  <Image source={tour.icon} className="w-16 h-16 mb-2" />
                  <Text className="text-sm text-gray-700 text-center">
                    {tour.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 작성한 리뷰 */}
        <View className="px-6 mb-6">
          <TouchableOpacity className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">
              내가 작성한 리뷰
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* 지역 불편/민원 신고 */}
        <View className="px-6 mb-6">
          <TouchableOpacity className="bg-white rounded-lg border border-gray-200 p-4 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">
              지역 불편/민원 신고
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* 문의 및 알림 */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            문의 및 알림
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-white rounded-lg border border-gray-200 p-4 items-center">
              <Text className="text-gray-900 font-medium">고객센터</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white rounded-lg border border-gray-200 p-4 items-center">
              <Text className="text-gray-900 font-medium">자주 묻는 질문</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white rounded-lg border border-gray-200 p-4 items-center">
              <Text className="text-gray-900 font-medium">약관 및 정책</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
