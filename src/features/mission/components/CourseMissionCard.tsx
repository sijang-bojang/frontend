import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CourseMission } from "../types";
import MissionCompleteBadge from "./MissionCompleteBadge";

interface CourseMissionCardProps {
  mission: CourseMission;
  onPress?: () => void;
}

const CourseMissionCard: React.FC<CourseMissionCardProps> = ({
  mission,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-2xl p-5 mb-3 shadow-sm border border-gray-100 ${
        mission.isCompleted ? "bg-gray-50" : "bg-white"
      }`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="relative">
        {/* 완료된 미션일 때 완료 배지 표시 */}
        {mission.isCompleted && <MissionCompleteBadge />}

        {/* 헤더: 제목과 보상 */}
        <View
          className={`flex-row items-start justify-between mb-4 ${
            mission.isCompleted ? "opacity-50" : ""
          }`}
        >
          <View className="flex-1 mr-4">
            <Text
              className={`text-lg font-bold mb-2 leading-6 ${
                mission.isCompleted ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {mission.title}
            </Text>
            <Text
              className={`text-sm leading-5 ${
                mission.isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {mission.description}
            </Text>
          </View>

          {/* 포인트 */}
          <View
            className={`px-4 py-3 rounded-xl border ${
              mission.isCompleted
                ? "bg-gray-100 border-gray-200"
                : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            }`}
          >
            <Text
              className={`text-lg font-bold ${
                mission.isCompleted ? "text-gray-500" : "text-blue-700"
              }`}
            >
              {mission.rewardPoints}P
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseMissionCard;
