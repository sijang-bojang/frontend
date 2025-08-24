import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import StampGrid from "./components/StampGrid";
import MissionCard from "./components/MissionCard";
import CourseMissionCard from "./components/CourseMissionCard";
import { missions, stampData } from "./data";
import {
  fetchUserMissions,
  fetchMissionDetail,
  MissionDetail,
  UserMissionResponse,
  deleteUserMission,
} from "../../shared/api";
import { useUserStore } from "../../shared/stores/userStore";
import { Mission, CourseMission } from "./types";

export default function MissionScreen() {
  const { currentUser } = useUserStore();
  const [userMissions, setUserMissions] = useState<UserMissionResponse[]>([]);
  const [courseMissions, setCourseMissions] = useState<CourseMission[]>([]);
  const [generalMissions, setGeneralMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 미션 제목에 따른 아이콘 자동 매핑 함수
  const getMissionIcon = (
    title: string
  ): { iconName: string; iconColor: string } => {
    if (
      title.includes("꾸준한") ||
      title.includes("출석") ||
      title.includes("연속")
    ) {
      return { iconName: "calendar.png", iconColor: "#FF6B9D" };
    } else if (
      title.includes("시장 마스터") ||
      title.includes("투어") ||
      title.includes("완주")
    ) {
      return { iconName: "map.png", iconColor: "#4CAF50" };
    } else if (title.includes("지역화폐") || title.includes("먹여살린다")) {
      return { iconName: "money.png", iconColor: "#FF9800" };
    } else if (title.includes("달콤한") || title.includes("디저트")) {
      return { iconName: "cake.png", iconColor: "#E91E63" };
    } else {
      // 기본 아이콘
      return { iconName: "map.png", iconColor: "#4CAF50" };
    }
  };

  // 미션 제목에 따른 프로그레스 값 자동 매핑 함수
  const getMissionProgress = (
    title: string
  ): { currentProgress: number; targetProgress: number } => {
    if (
      title.includes("꾸준한") ||
      title.includes("출석") ||
      title.includes("연속")
    ) {
      return { currentProgress: 7, targetProgress: 10 }; // 3/10
    } else if (
      title.includes("시장 마스터") ||
      title.includes("투어") ||
      title.includes("완주")
    ) {
      return { currentProgress: 0, targetProgress: 1 }; // 0/1
    } else if (title.includes("지역화폐") || title.includes("먹여살린다")) {
      return { currentProgress: 3, targetProgress: 3 }; // 1/3
    } else if (title.includes("달콤한") || title.includes("디저트")) {
      return { currentProgress: 2, targetProgress: 5 }; // 2/5
    } else {
      // 기본값
      return { currentProgress: 0, targetProgress: 1 };
    }
  };

  // 사용자 미션 데이터 가져오기
  const loadUserMissions = async () => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // 1. 사용자 미션 목록 가져오기
      const missions = await fetchUserMissions(currentUser.userId);
      console.log("가져온 사용자 미션 목록:", missions);
      setUserMissions(missions);

      // 사용자 미션이 없으면 기본 데이터 사용
      if (missions.length === 0) {
        console.log("사용자 미션이 없음, 기본 데이터 사용");
        setGeneralMissions([]); // 빈 배열로 설정
        setCourseMissions([]);
        return;
      }

      // 2. 각 미션의 상세 정보 가져오기
      const missionDetails = await Promise.all(
        missions.map((mission) => fetchMissionDetail(mission.missionId))
      );
      console.log("가져온 미션 상세 정보:", missionDetails);

      // 3. 미션 타입에 따라 분류
      const courseList: CourseMission[] = [];
      const generalList: Mission[] = [];

      missionDetails.forEach((detail, index) => {
        const userMission = missions[index];
        console.log(`미션 ${detail.missionId} 분류 중:`, {
          title: detail.title,
          isVisitType: detail.isVisitType,
          isNonVisitType: detail.isNonVisitType,
        });

        if (detail.isVisitType) {
          console.log("코스 미션으로 분류:", detail.title);
          // 코스 미션에 추가
          courseList.push({
            missionId: detail.missionId,
            title: detail.title,
            description: detail.description,
            rewardPoints: detail.rewardPoints,
            missionType: detail.missionType,
            spotNames: detail.spotNames,
            isVisitType: detail.isVisitType,
            isNonVisitType: detail.isNonVisitType,
            isCompleted: userMission.completed,
            userMissionId: userMission.userMissionId, // userMissionId 추가
          });
        } else if (detail.isNonVisitType) {
          console.log("일반 미션으로 분류:", detail.title);
          // 아이콘 자동 매핑
          const { iconName, iconColor } = getMissionIcon(detail.title);

          // 프로그레스 값 자동 매핑
          const { currentProgress, targetProgress } = getMissionProgress(
            detail.title
          );

          // 일반 미션에 추가
          generalList.push({
            id: detail.missionId,
            title: detail.title,
            description: detail.description,
            currentProgress: currentProgress, // 자동 매핑된 현재 진행도
            targetProgress: targetProgress, // 자동 매핑된 목표 진행도
            iconName: iconName, // 자동 매핑된 아이콘
            iconColor: iconColor, // 자동 매핑된 색상
            isCompleted: userMission.completed,
            userMissionId: userMission.userMissionId, // userMissionId 추가
            rewardPoints: detail.rewardPoints, // 보상 포인트 추가
          });
        }
      });

      console.log("분류된 코스 미션:", courseList);
      console.log("분류된 일반 미션:", generalList);

      setCourseMissions(courseList);
      setGeneralMissions([...generalList]); // API에서 가져온 일반 미션만 표시
    } catch (error) {
      console.error("사용자 미션 데이터 로드 실패:", error);
      Alert.alert("미션 로드 실패", "미션 데이터를 불러오는데 실패했습니다.");
      // 실패 시 기본 데이터 사용
      setGeneralMissions(missions);
      setCourseMissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 화면이 포커스될 때마다 미션 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      loadUserMissions();
    }, [currentUser])
  );

  const handleMissionPress = (missionId: number) => {
    console.log(`Mission ${missionId} pressed`);
    // TODO: 미션 상세 화면으로 이동 또는 미션 완료 처리
  };

  const handleCourseMissionPress = (missionId: number) => {
    console.log(`Course Mission ${missionId} pressed`);
    // TODO: 코스 미션 상세 화면으로 이동 또는 미션 완료 처리
  };

  // 미션 삭제 핸들러
  const handleMissionDelete = async (userMissionId: number) => {
    try {
      await deleteUserMission(userMissionId);

      // 삭제 후 미션 목록 새로고침
      if (currentUser) {
        const missions = await fetchUserMissions(currentUser.userId);
        setUserMissions(missions);

        // 미션 상세 정보 다시 가져와서 분류
        const missionDetails = await Promise.all(
          missions.map((mission) => fetchMissionDetail(mission.missionId))
        );

        const courseList: CourseMission[] = [];
        const generalList: Mission[] = [];

        missionDetails.forEach((detail, index) => {
          const userMission = missions[index];

          if (detail.isVisitType) {
            courseList.push({
              missionId: detail.missionId,
              title: detail.title,
              description: detail.description,
              rewardPoints: detail.rewardPoints,
              missionType: detail.missionType,
              spotNames: detail.spotNames,
              isVisitType: detail.isVisitType,
              isNonVisitType: detail.isNonVisitType,
              isCompleted: userMission.completed,
              userMissionId: userMission.userMissionId,
            });
          } else if (detail.isNonVisitType) {
            const { iconName, iconColor } = getMissionIcon(detail.title);
            const { currentProgress, targetProgress } = getMissionProgress(
              detail.title
            );
            generalList.push({
              id: detail.missionId,
              title: detail.title,
              description: detail.description,
              currentProgress: currentProgress,
              targetProgress: targetProgress,
              iconName: iconName,
              iconColor: iconColor,
              isCompleted: userMission.completed,
              userMissionId: userMission.userMissionId,
              rewardPoints: detail.rewardPoints,
            });
          }
        });

        setCourseMissions(courseList);
        setGeneralMissions(generalList);
      }

      Alert.alert("삭제 완료", "미션이 삭제되었습니다.");
    } catch (error) {
      console.error("미션 삭제 실패:", error);
      Alert.alert("삭제 실패", "미션 삭제에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg">미션 데이터를 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

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

        {/* 코스 미션 섹션 */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4 px-2">
            코스 미션
          </Text>
          <View className="rounded-2xl">
            {courseMissions.map((mission) => (
              <CourseMissionCard
                key={mission.missionId}
                mission={mission}
                userMissionId={mission.userMissionId}
                onPress={() => handleCourseMissionPress(mission.missionId)}
                onDelete={handleMissionDelete}
              />
            ))}
          </View>
        </View>

        {/* 일반 미션 섹션 */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4 px-2">
            일반 미션
          </Text>
          <View className="rounded-2xl">
            {generalMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                id={mission.id}
                title={mission.title}
                description={mission.description}
                currentProgress={mission.currentProgress}
                targetProgress={mission.targetProgress}
                iconName={mission.iconName}
                iconColor={mission.iconColor}
                userMissionId={mission.userMissionId}
                isCompleted={mission.isCompleted}
                rewardPoints={mission.rewardPoints}
                onPress={() => handleMissionPress(mission.id)}
                onDelete={handleMissionDelete}
              />
            ))}
          </View>
        </View>

        {/* 하단 여백 */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
