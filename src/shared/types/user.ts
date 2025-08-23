// 사용자 관련 타입 정의
export interface User {
  userId: number;
  username: string;
  email: string;
  rewardPoints: number;
  exp: number;
  level: number;
}

// API 응답 타입 정의 (실제 서버에서 받는 데이터)
export interface UserApiResponse {
  userId: number;
  username: string;
  email: string;
  totalReward: number;
  exp: number;
  completedMissionCount: number;
  completedCourseCount: number;
  completeStamp: number;
}

// 사용자 생성 요청 타입
export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

// 사용자 수정 요청 타입
export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

// 사용자 보상 포인트 업데이트 요청 타입
export interface UpdateUserRewardRequest {
  rewardPoints: number;
}

// 사용자 경험치 업데이트 요청 타입
export interface UpdateUserExpRequest {
  exp: number;
}
