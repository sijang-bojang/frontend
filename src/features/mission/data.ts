import { Mission, StampData } from "./types";

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
    id: 1,
    title: "꾸준한 당신 2",
    description: "10일 출석하기",
    currentProgress: 4,
    targetProgress: 10,
    iconName: "calendar.png",
    iconColor: "#FF6B9D",
    isCompleted: false,
  },
  {
    id: 2,
    title: "시장 마스터 1",
    description: "AI 투어 1번 완주하기",
    currentProgress: 1,
    targetProgress: 1,
    iconName: "map.png",
    iconColor: "#4CAF50",
    isCompleted: false,
  },
  {
    id: 3,
    title: "내 지역 내가 먹여살린다 1",
    description: "지역화폐 사용 3회 하기",
    currentProgress: 3,
    targetProgress: 3,
    iconName: "money.png",
    iconColor: "#FF9800",
    isCompleted: true,
  },
  {
    id: 4,
    title: "달콤한 하루 2",
    description: "디저트가게 5회 방문하기",
    currentProgress: 4,
    targetProgress: 5,
    iconName: "cake.png",
    iconColor: "#E91E63",
    isCompleted: false,
  },
];

export { missionIcons };
