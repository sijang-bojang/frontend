import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StampGrid from "./components/StampGrid";
import MissionCard from "./components/MissionCard";
import { missions, stampData } from "./data";

export default function MissionScreen() {
  const handleMissionPress = (missionId: number) => {
    console.log(`Mission ${missionId} pressed`);
    // TODO: 미션 상세 화면으로 이동 또는 미션 완료 처리
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView className="flex-1 px-5 py-4">
        {/* 로고 헤더 */}
        <View className="items-center mb-6">
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            className="h-10 w-32"
          />
        </View>
        {/* 스탬프 수집 섹션 */}
        <StampGrid
          completedStamps={stampData.completedStamps}
          totalStamps={stampData.totalStamps}
          rewardPoints={stampData.rewardPoints}
        />

        {/* 미션 목록 섹션 */}
        <View className="bg-gray-100 rounded-2xl p-6">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              id={mission.id}
              title={mission.title}
              description={mission.description}
              currentProgress={mission.currentProgress}
              targetProgress={mission.targetProgress}
              iconName={mission.iconName}
              iconColor={mission.iconColor}
              onPress={() => handleMissionPress(mission.id)}
            />
          ))}
        </View>

        {/* 하단 여백 */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
