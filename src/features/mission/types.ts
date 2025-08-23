export interface Mission {
  id: number;
  title: string;
  description: string;
  currentProgress: number;
  targetProgress: number;
  iconName: string;
  iconColor: string;
  isCompleted: boolean;
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
}

export interface StampData {
  completedStamps: number;
  totalStamps: number;
  rewardPoints: number;
}
