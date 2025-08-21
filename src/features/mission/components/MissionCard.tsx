import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { missionIcons } from "../data";

interface MissionCardProps {
  id: number;
  title: string;
  description: string;
  currentProgress: number;
  targetProgress: number;
  iconName: string;
  iconColor: string;
  onPress?: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
  title,
  description,
  currentProgress,
  targetProgress,
  iconName,
  iconColor,
  onPress,
}) => {
  const progressPercentage = Math.min(
    (currentProgress / targetProgress) * 100,
    100
  );
  const isCompleted = currentProgress >= targetProgress;

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
      activeOpacity={0.7}
      onPress={onPress}
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
          <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
          <Text className="text-gray-600 text-sm mb-3">{description}</Text>

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
  );
};

export default MissionCard;
