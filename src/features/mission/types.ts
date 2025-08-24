export interface Mission {
  id: number;
  title: string;
  description: string;
  currentProgress: number;
  targetProgress: number;
  iconName: string;
  iconColor: string;
  isCompleted: boolean;
  userMissionId?: number; // 사용자 미션 ID 추가
  rewardPoints?: number; // 보상 포인트 추가
}

export interface CourseMission {
  missionId: number;
  title: string;
  description: string;
  rewardPoints: number;
  missionType: string;
  spotNames: string[];
  isVisitType: boolean;
  isNonVisitType: boolean;
  isCompleted: boolean;
  userMissionId?: number; // 사용자 미션 ID 추가
}

export interface StampData {
  completedStamps: number;
  totalStamps: number;
  rewardPoints: number;
}
