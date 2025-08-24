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
import {
  getLevelByExp,
  getLevelProgress,
  getExpToNextLevel,
} from "../../shared/constants/levels";

export default function ProfileScreen() {
  const { currentUser, isLoading, error, loginAsUser } = useUserStore();

  // App.tsx에서 이미 사용자 로그인을 처리하므로 여기서는 제거

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
            onPress={() => {
              // 에러 발생 시 사용자 ID 1번으로 로그인 (테스트용)
              // 실제 앱에서는 사용자 인증 흐름을 따라야 합니다.
              loginAsUser(1);
            }}
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
          <View className="flex-row items-start">
            {/* 프로필 아이콘 - 크게 */}
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="person" size={40} color="#6B7280" />
            </View>

            {/* 사용자 정보 - 오른쪽 영역 */}
            <View className="flex-1">
              {/* 이름과 계급 */}
              <Text className="text-xl font-bold text-gray-900 mb-2">
                {currentUser.username}
              </Text>
              <View className="flex-row items-center mb-4">
                <View className="bg-purple-100 rounded-full px-4 py-2 mr-4">
                  <Text className="text-sm text-purple-700 font-medium">
                    {getLevelByExp(currentUser.exp).name}
                  </Text>
                </View>

                {/* XP 아이콘과 경험치 바 */}
                <View className="flex-row items-center flex-1">
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-xs text-gray-600">
                        {currentUser.exp.toLocaleString()}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {getLevelProgress(currentUser.exp)}%
                      </Text>
                    </View>
                    <View className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${getLevelProgress(currentUser.exp)}%`,
                        }}
                      />
                    </View>
                  </View>
                  <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center ml-2">
                    <Text className="text-white font-bold text-xs">XP</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 포인트 박스 */}
        <View className="px-6 mb-6">
          <View className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  포인트
                </Text>
                <Text className="text-sm text-gray-600">
                  지금까지 모은 포인트
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-3xl font-bold text-blue-600">
                  {currentUser.rewardPoints.toLocaleString()}
                </Text>
                <Text className="text-lg text-blue-500 font-semibold">P</Text>
              </View>
            </View>
          </View>
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
