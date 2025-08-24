import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CourseMission } from "../types";
import MissionCompleteBadge from "./MissionCompleteBadge";

interface CourseMissionCardProps {
  mission: CourseMission;
  userMissionId?: number; // 삭제용 ID 추가
  onPress?: () => void;
  onDelete?: (userMissionId: number) => void; // 삭제 핸들러 추가
}

const CourseMissionCard: React.FC<CourseMissionCardProps> = ({
  mission,
  userMissionId,
  onPress,
  onDelete,
}) => {
  // 길게 누르기로 삭제 확인
  const handleLongPress = () => {
    if (!userMissionId || !onDelete) return;

    Alert.alert(
      "미션 삭제",
      "이 미션을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => onDelete(userMissionId),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      className={`rounded-2xl p-5 mb-3 shadow-sm border border-gray-100 ${
        mission.isCompleted ? "bg-gray-50" : "bg-white"
      }`}
      activeOpacity={mission.isCompleted ? 1.0 : 0.7}
      onPress={mission.isCompleted ? handleLongPress : onPress}
      onLongPress={handleLongPress}
      delayLongPress={500} // 0.5초로 단축
    >
      <View className="relative">
        {/* 완료된 미션일 때 완료 배지 표시 */}
        {mission.isCompleted && <MissionCompleteBadge />}

        {/* 헤더: 제목과 보상 */}
        <View className="mb-4">
          {/* 제목과 포인트를 한 줄에 표시 */}
          <View className="flex-row items-start justify-between mb-2">
            <Text
              className={`text-lg font-bold flex-1 mr-3 leading-6 ${
                mission.isCompleted ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {mission.title}
            </Text>

            {/* 보상 포인트 - 일반 미션과 동일한 스타일 */}
            <View className={`px-3 py-1 rounded-full ${
              mission.isCompleted 
                ? "bg-gray-100" 
                : "bg-blue-100"
            }`}>
              <Text className={`text-sm font-bold ${
                mission.isCompleted ? "text-gray-500" : "text-blue-700"
              }`}>
                {mission.rewardPoints}P
              </Text>
            </View>
          </View>

          {/* 설명 */}
          <Text
            className={`text-sm leading-5 ${
              mission.isCompleted ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {mission.description}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default CourseMissionCard;
