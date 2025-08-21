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

export interface StampData {
  completedStamps: number;
  totalStamps: number;
  rewardPoints: number;
}
