import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

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
  // 화면 크기 가져오기
  const screenWidth = Dimensions.get("window").width;

  // 그리드 상자 패딩 (좌우 24px, 상하 24px)
  const gridPadding = 2; // 패딩 줄임
  const gridSpacing = 12; // 스탬프 간 간격 줄임

  // 그리드 상자 내부 사용 가능한 너비 계산
  const availableWidth = screenWidth - gridPadding * 2 - 40; // 외부 패딩 줄임

  // 스탬프 크기 계산 (4개 스탬프 + 3개 간격이 사용 가능한 너비에 맞춰짐)
  const stampSize = Math.min(
    (availableWidth - gridSpacing * 3) / 4, // 4개 스탬프, 3개 간격
    120 // 최대 크기 제한 증가
  );

  const renderStamp = (index: number) => {
    const isCompleted = index < completedStamps;

    return (
      <View key={index} className="items-center">
        <Image
          source={
            isCompleted
              ? require("../../../assets/images/stamp/stamp_blue.png")
              : require("../../../assets/images/stamp/stamp_black.png")
          }
          style={{
            width: stampSize,
            height: stampSize,
            tintColor: isCompleted ? undefined : "#9CA3AF", // 회색으로 변경
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View className="bg-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
      <View className="mb-4">
        {/* 2x4 그리드 레이아웃 - 그리드 상자 안에서 꽉 차게 배치 */}
        <View
          className="flex-row justify-between"
          style={{
            paddingHorizontal: gridPadding,
            paddingVertical: 0,
          }}
        >
          {Array.from({ length: 4 }, (_, index) => renderStamp(index))}
        </View>
        <View
          className="flex-row justify-between"
          style={{
            paddingHorizontal: gridPadding,
            paddingVertical: 0,
          }}
        >
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
