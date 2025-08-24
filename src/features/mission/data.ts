import { Mission, CourseMission, StampData } from "./types";

export const stampData: StampData = {
  completedStamps: 5,
  totalStamps: 8,
  rewardPoints: 2000,
};

// 미션 아이콘 매핑
const missionIcons = {
  "calendar.png": require("../../assets/images/mission_icons/calendar.png"),
  "map.png": require("../../assets/images/mission_icons/map.png"),
  "money.png": require("../../assets/images/mission_icons/money.png"),
  "cake.png": require("../../assets/images/mission_icons/cake.png"),
};

export const missions: Mission[] = [
  {
    id: 47,
    title: "꾸준한 당신 2",
    description: "10일 동안 연속 출석하기",
    currentProgress: 4,
    targetProgress: 10,
    iconName: "calendar.png", // 출석/시간 관련 아이콘
    iconColor: "#FF6B9D",
    isCompleted: false,
    rewardPoints: 500,
  },
  {
    id: 48,
    title: "시장 마스터 1",
    description: "AI 투어 코스를 1번 완주하세요",
    currentProgress: 0,
    targetProgress: 1,
    iconName: "map.png", // 투어/지도 관련 아이콘
    iconColor: "#4CAF50",
    isCompleted: false,
    rewardPoints: 100,
  },
  {
    id: 49,
    title: "내 지역 내가 먹여살린다 1",
    description: "지역화폐를 3회 사용하세요",
    currentProgress: 3,
    targetProgress: 3,
    iconName: "money.png", // 화폐/금전 관련 아이콘
    iconColor: "#FF9800",
    isCompleted: true,
    rewardPoints: 100,
  },
  {
    id: 51,
    title: "달콤한 하루 2",
    description: "디저트 가게를 5회 방문하세요",
    currentProgress: 4,
    targetProgress: 5,
    iconName: "cake.png", // 디저트/음식 관련 아이콘
    iconColor: "#E91E63",
    isCompleted: false,
    rewardPoints: 200,
  },
];

export const courseMissions: CourseMission[] = [
  {
    missionId: 2,
    title: "단짠단짠 특제 간장치킨",
    description:
      "스모프치킨의 중독성 강한 매콤달콤 특제 간장 소스 치킨을 사진으로 남겨주세요.",
    rewardPoints: 100,
    missionType: "VISIT",
    spotNames: ["스모프치킨"],
    isVisitType: true,
    isNonVisitType: false,
    isCompleted: true,
  },
];

export { missionIcons };
