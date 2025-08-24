import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { missionIcons } from "../data";
import MissionCompleteBadge from "./MissionCompleteBadge";

interface MissionCardProps {
  id: number;
  title: string;
  description: string;
  currentProgress: number;
  targetProgress: number;
  iconName: string;
  iconColor: string;
  userMissionId?: number; // 삭제용 ID 추가
  isCompleted?: boolean; // 완료 상태 추가
  rewardPoints?: number; // 보상 포인트 추가
  onPress?: () => void;
  onDelete?: (userMissionId: number) => void; // 삭제 핸들러 추가
}

const MissionCard: React.FC<MissionCardProps> = ({
  title,
  description,
  currentProgress,
  targetProgress,
  iconName,
  iconColor,
  userMissionId,
  isCompleted = false,
  rewardPoints = 0,
  onPress,
  onDelete,
}) => {
  const progressPercentage = Math.min(
    (currentProgress / targetProgress) * 100,
    100
  );

  // 길게 누르기로 삭제 확인
  const handleLongPress = () => {
    if (!userMissionId || !onDelete) return;

    Alert.alert("미션 삭제", "이 미션을 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => onDelete(userMissionId),
      },
    ]);
  };

  return (
    <View className="relative">
      <TouchableOpacity
        className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 ${
          isCompleted ? "opacity-50" : ""
        }`}
        activeOpacity={0.7}
        onPress={onPress}
        onLongPress={handleLongPress}
        delayLongPress={800} // 0.8초 길게 누르기
      >
        <View className="flex-row items-center">
          {/* 아이콘 */}
          <View className="mr-4 justify-center">
            <Image
              source={missionIcons[iconName as keyof typeof missionIcons]}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>

          {/* 미션 정보 */}
          <View className="flex-1">
            {/* 제목과 포인트를 한 줄에 표시 */}
            <View className="flex-row items-start justify-between mb-1">
              <Text
                className={`text-lg font-bold flex-1 mr-3 ${
                  isCompleted ? "text-gray-500" : "text-gray-900"
                }`}
              >
                {title}
              </Text>

              {/* 보상 포인트 */}
              {rewardPoints > 0 && (
                <View
                  className={`px-3 py-1 rounded-full ${
                    isCompleted ? "bg-gray-100" : "bg-blue-100"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      isCompleted ? "text-gray-500" : "text-blue-700"
                    }`}
                  >
                    {rewardPoints}P
                  </Text>
                </View>
              )}
            </View>

            <Text
              className={`text-sm mb-3 ${
                isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {description}
            </Text>

            {/* 진행률 바 */}
            <View className="mb-2">
              <View className="relative">
                <View className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </View>
                {/* 진행률 텍스트를 진행바 위에 표시 */}
                <View className="absolute inset-0 items-center justify-center">
                  <Text
                    className={`text-xs font-bold ${
                      progressPercentage > 50 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {currentProgress}/{targetProgress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* 완료 배지 */}
      {isCompleted && <MissionCompleteBadge />}
    </View>
  );
};

export default MissionCard;
