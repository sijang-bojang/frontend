import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CourseMission } from "../types";

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
      className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View>
        {/* 헤더: 제목과 보상 */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1 mr-4">
            <Text className="text-lg font-bold text-gray-900 mb-2 leading-6">
              {mission.title}
            </Text>
            <Text className="text-gray-600 text-sm leading-5">
              {mission.description}
            </Text>
          </View>

          {/* 포인트 */}
          <View className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-3 rounded-xl border border-blue-200">
            <Text className="text-lg font-bold text-blue-700">
              {mission.rewardPoints}P
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseMissionCard;
