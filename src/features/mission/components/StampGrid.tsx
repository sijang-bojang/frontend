import React from "react";
import { View, Text, Image } from "react-native";

interface StampGridProps {
  completedStamps: number;
  totalStamps?: number;
  rewardPoints?: number;
}

const StampGrid: React.FC<StampGridProps> = ({
  completedStamps = 6,
  totalStamps = 8,
  rewardPoints = 2000,
}) => {
  const renderStamp = (index: number) => {
    const isCompleted = index < completedStamps;

    return (
      <View key={index} className="items-center px-1">
        <Image
          source={
            isCompleted
              ? require("../../../assets/images/stamp/stamp_blue.png")
              : require("../../../assets/images/stamp/stamp_black.png")
          }
          className="w-24 h-24"
          resizeMode="contain"
          style={{
            tintColor: isCompleted ? undefined : "#9CA3AF", // 회색으로 변경
          }}
        />
      </View>
    );
  };

  return (
    <View className="bg-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
      <View className="mb-4">
        {/* 2x4 그리드 레이아웃 - 반응형 중앙 정렬 */}
        <View className="flex-row justify-center space-x-6">
          {Array.from({ length: 4 }, (_, index) => renderStamp(index))}
        </View>
        <View className="flex-row justify-center space-x-6 mt-1">
          {Array.from({ length: 4 }, (_, index) => renderStamp(index + 4))}
        </View>
      </View>
      <View className="items-center">
        <Text className="text-gray-900 text-base">
          스탬프 {totalStamps}개 찍으면{" "}
          <Text className="text-blue-600 font-bold">{rewardPoints}P</Text>{" "}
          드려요
        </Text>
      </View>
    </View>
  );
};

export default StampGrid;
