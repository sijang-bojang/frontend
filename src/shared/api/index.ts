import axios from "axios";
import { Market } from "../../features/tour/types";
import { Spot } from "../types/market";
import {
  User,
  UserApiResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserRewardRequest,
  UpdateUserExpRequest,
} from "../types/user";
import { API_CONFIG } from "../constants/api";

// API 기본 설정
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log("API 요청:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("API 요청 오류:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log("API 응답:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API 응답 오류:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// 시장 데이터 가져오기
export const fetchMarkets = async (): Promise<Market[]> => {
  try {
    const response = await api.get<Market[]>(API_CONFIG.ENDPOINTS.MARKETS);
    return response.data;
  } catch (error) {
    console.error("시장 데이터 가져오기 실패:", error);
    throw error;
  }
};

// 시장별 스팟 데이터 가져오기
export const fetchSpotsByMarket = async (marketId: number): Promise<Spot[]> => {
  try {
    const response = await api.get<Spot[]>(
      `${API_CONFIG.ENDPOINTS.SPOTS_BY_MARKET}/${marketId}`
    );
    return response.data;
  } catch (error) {
    console.error("스팟 데이터 가져오기 실패:", error);
    throw error;
  }
};

// 스팟 상세 정보 가져오기 (미션 정보 포함)
export const fetchSpotDetail = async (spotId: number) => {
  try {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.SPOTS}/${spotId}`);
    return response.data;
  } catch (error) {
    console.error(`스팟 상세 정보 가져오기 실패 (ID: ${spotId}):`, error);
    throw error;
  }
};

// 스팟에 연결된 모든 미션 조회
export const fetchSpotMissions = async (spotId: number) => {
  try {
    const response = await api.get(
      `${API_CONFIG.ENDPOINTS.SPOT_MISSIONS}/${spotId}/missions`
    );
    return response.data;
  } catch (error) {
    console.error(`스팟 미션 조회 실패 (ID: ${spotId}):`, error);
    throw error;
  }
};

// AI 코스 추천 API
export interface CourseRecommendRequest {
  marketId: number;
  marketName: string;
  tags: string[];
}

export interface CourseRecommendResponse {
  courseId: number;
  courseName: string;
  description: string;
  marketName: string;
  recommendationReason: string;
  confidenceScore: number;
}

// 코스 정보 인터페이스
export interface Course {
  courseId: number;
  marketId: number;
  marketName: string;
  name: string;
  description: string;
  typeNames: string[];
  spotCount: number;
  courseSpots: Array<{
    spotId: number;
    spotName: string;
    stepNumber: number;
    category: string;
    description: string;
    latitude: number;
    longitude: number;
  }>;
  isFamilyCourse: boolean;
  isCoupleCourse: boolean;
}

export const recommendCourse = async (
  request: CourseRecommendRequest
): Promise<CourseRecommendResponse> => {
  try {
    const response = await api.post<CourseRecommendResponse>(
      API_CONFIG.ENDPOINTS.COURSE_RECOMMEND,
      request
    );
    return response.data;
  } catch (error) {
    console.error("AI 코스 추천 실패:", error);
    throw error;
  }
};

// 시장별 코스 조회
export const fetchCoursesByMarket = async (
  marketId: number
): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>(
      `${API_CONFIG.ENDPOINTS.COURSES_BY_MARKET}/${marketId}`
    );
    return response.data;
  } catch (error) {
    console.error("시장별 코스 조회 실패:", error);
    throw error;
  }
};

// 코스 상세 정보 가져오기
export const fetchCourseDetail = async (courseId: number): Promise<Course> => {
  try {
    const response = await api.get<Course>(
      `${API_CONFIG.ENDPOINTS.COURSES}/${courseId}`
    );

    return response.data;
  } catch (error) {
    console.error("코스 상세 정보 가져오기 실패:", error);
    throw error;
  }
};

// 코스의 모든 미션 가져오기
export const fetchCourseMissions = async (courseId: number) => {
  try {
    const response = await api.get(
      `${API_CONFIG.ENDPOINTS.COURSES}/${courseId}/missions`
    );
    return response.data;
  } catch (error) {
    console.error(`코스 미션 조회 실패 (courseId: ${courseId}):`, error);
    throw error;
  }
};

// 사용자 관련 API 함수들

// 모든 사용자 조회
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<UserApiResponse[]>(
      API_CONFIG.ENDPOINTS.USERS
    );
    return response.data.map(transformUserApiResponse);
  } catch (error) {
    console.error("사용자 목록 가져오기 실패:", error);
    throw error;
  }
};

// API 응답을 User 타입으로 변환하는 헬퍼 함수
const transformUserApiResponse = (apiResponse: UserApiResponse): User => {
  // level은 exp를 기반으로 계산 (예: exp / 100 + 1)
  const level = Math.floor(apiResponse.exp / 100) + 1;

  return {
    userId: apiResponse.userId,
    username: apiResponse.username,
    email: apiResponse.email,
    rewardPoints: apiResponse.totalReward,
    exp: apiResponse.exp,
    level: level,
  };
};

// 특정 사용자 조회
export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const response = await api.get<UserApiResponse>(
      `${API_CONFIG.ENDPOINTS.USER_BY_ID}/${userId}`
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error(`사용자 정보 가져오기 실패 (ID: ${userId}):`, error);
    throw error;
  }
};

// 사용자명으로 사용자 조회
export const fetchUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await api.get<UserApiResponse>(
      `${API_CONFIG.ENDPOINTS.USER_BY_USERNAME}/${username}`
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error(`사용자명으로 사용자 조회 실패 (${username}):`, error);
    throw error;
  }
};

// 이메일로 사용자 조회
export const fetchUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await api.get<UserApiResponse>(
      `${API_CONFIG.ENDPOINTS.USER_BY_EMAIL}/${email}`
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error(`이메일로 사용자 조회 실패 (${email}):`, error);
    throw error;
  }
};

// 사용자 생성
export const createUser = async (
  userData: CreateUserRequest
): Promise<User> => {
  try {
    const response = await api.post<UserApiResponse>(
      API_CONFIG.ENDPOINTS.USERS,
      userData
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error("사용자 생성 실패:", error);
    throw error;
  }
};

// 사용자 정보 수정
export const updateUser = async (
  userId: number,
  userData: UpdateUserRequest
): Promise<User> => {
  try {
    const response = await api.put<UserApiResponse>(
      `${API_CONFIG.ENDPOINTS.USER_BY_ID}/${userId}`,
      userData
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error(`사용자 정보 수정 실패 (ID: ${userId}):`, error);
    throw error;
  }
};

// 사용자 보상 포인트 업데이트
export const updateUserReward = async (
  userId: number,
  rewardData: UpdateUserRewardRequest
): Promise<User> => {
  try {
    const response = await api.put<UserApiResponse>(
      `${API_CONFIG.ENDPOINTS.USER_REWARD}/${userId}/reward?rewardPoints=${rewardData.rewardPoints}`
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error(`사용자 보상 포인트 업데이트 실패 (ID: ${userId}):`, error);
    throw error;
  }
};

// 사용자 경험치 업데이트
export const updateUserExp = async (
  userId: number,
  expData: UpdateUserExpRequest
): Promise<User> => {
  try {
    const response = await api.put<UserApiResponse>(
      `${API_CONFIG.ENDPOINTS.USER_EXP}/${userId}/exp?exp=${expData.exp}`
    );
    return transformUserApiResponse(response.data);
  } catch (error) {
    console.error(`사용자 경험치 업데이트 실패 (ID: ${userId}):`, error);
    throw error;
  }
};

// 사용자 삭제
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`${API_CONFIG.ENDPOINTS.USER_BY_ID}/${userId}`);
  } catch (error) {
    console.error(`사용자 삭제 실패 (ID: ${userId}):`, error);
    throw error;
  }
};

// 사용자 미션 관련 타입 정의
export interface UserMissionStartRequest {
  userId: number;
  missionId: number;
}

export interface UserMissionResponse {
  userMissionId: number;
  userId: number;
  userName: string;
  missionId: number;
  missionTitle: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  startedAt: string | null;
  completedAt: string | null;
  completed: boolean;
  inProgress: boolean;
}

// 미션 상세 정보 타입
export interface MissionDetail {
  missionId: number;
  title: string;
  description: string;
  rewardPoints: number;
  missionType: "VISIT" | "NON_VISIT";
  spotNames: string[];
  isVisitType: boolean;
  isNonVisitType: boolean;
}

// 사용자 미션 시작
export const startUserMission = async (
  userId: number,
  missionId: number
): Promise<UserMissionResponse> => {
  try {
    const response = await api.post<UserMissionResponse>(
      `${API_CONFIG.ENDPOINTS.USER_MISSION_START}?userId=${userId}&missionId=${missionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `사용자 미션 시작 실패 (userId: ${userId}, missionId: ${missionId}):`,
      error
    );
    throw error;
  }
};

// 사용자별 미션 조회
export const fetchUserMissions = async (
  userId: number
): Promise<UserMissionResponse[]> => {
  try {
    const response = await api.get<UserMissionResponse[]>(
      `${API_CONFIG.ENDPOINTS.USER_MISSIONS_BY_USER}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`사용자 미션 조회 실패 (userId: ${userId}):`, error);
    throw error;
  }
};

// 사용자별 상태별 미션 조회 (IN_PROGRESS 상태만)
export const fetchUserMissionsByStatus = async (
  userId: number,
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
): Promise<UserMissionResponse[]> => {
  try {
    const response = await api.get<UserMissionResponse[]>(
      `${API_CONFIG.ENDPOINTS.USER_MISSIONS_BY_USER}/${userId}/status/${status}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `사용자 미션 상태별 조회 실패 (userId: ${userId}, status: ${status}):`,
      error
    );
    throw error;
  }
};

// 미션 상세 정보 조회
export const fetchMissionDetail = async (
  missionId: number
): Promise<MissionDetail> => {
  try {
    const response = await api.get<MissionDetail>(
      `${API_CONFIG.ENDPOINTS.MISSIONS}/${missionId}`
    );
    return response.data;
  } catch (error) {
    console.error(`미션 상세 정보 조회 실패 (missionId: ${missionId}):`, error);
    throw error;
  }
};

// 사용자 코스 진행도 관련 타입 정의
export interface UserCourseProgressResponse {
  id: number;
  userId: number;
  courseId: number;
  courseName: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
  startedAt: string | null;
  completedAt: string | null;
}

// 사용자 코스 시작
export const startUserCourse = async (
  userId: number,
  courseId: number
): Promise<UserCourseProgressResponse> => {
  try {
    const response = await api.post<UserCourseProgressResponse>(
      `${API_CONFIG.ENDPOINTS.USER_COURSE_PROGRESS_START}?userId=${userId}&courseId=${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `사용자 코스 시작 실패 (userId: ${userId}, courseId: ${courseId}):`,
      error
    );
    throw error;
  }
};

// 사용자 코스 진행도 업데이트
export const updateUserCourseProgress = async (
  userId: number,
  courseId: number,
  currentStep: number
): Promise<UserCourseProgressResponse> => {
  try {
    const response = await api.put<UserCourseProgressResponse>(
      `${API_CONFIG.ENDPOINTS.USER_COURSE_PROGRESS_UPDATE}?userId=${userId}&courseId=${courseId}&currentStep=${currentStep}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `사용자 코스 진행도 업데이트 실패 (userId: ${userId}, courseId: ${courseId}):`,
      error
    );
    throw error;
  }
};

// 사용자 코스 완료
export const completeUserCourse = async (
  userId: number,
  courseId: number
): Promise<UserCourseProgressResponse> => {
  try {
    const response = await api.post<UserCourseProgressResponse>(
      `${API_CONFIG.ENDPOINTS.USER_COURSE_PROGRESS_COMPLETE}?userId=${userId}&courseId=${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `사용자 코스 완료 실패 (userId: ${userId}, courseId: ${courseId}):`,
      error
    );
    throw error;
  }
};

// 사용자별 코스 진행도 조회
export const fetchUserCourseProgress = async (
  userId: number
): Promise<UserCourseProgressResponse[]> => {
  try {
    const response = await api.get<UserCourseProgressResponse[]>(
      `${API_CONFIG.ENDPOINTS.USER_COURSE_PROGRESS_BY_USER}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`사용자 코스 진행도 조회 실패 (userId: ${userId}):`, error);
    throw error;
  }
};

// 사용자 미션 완료
export const completeUserMission = async (
  userId: number,
  missionId: number
): Promise<UserMissionResponse> => {
  try {
    const response = await api.post<UserMissionResponse>(
      `${API_CONFIG.ENDPOINTS.USER_MISSION_COMPLETE}?userId=${userId}&missionId=${missionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `사용자 미션 완료 실패 (userId: ${userId}, missionId: ${missionId}):`,
      error
    );
    throw error;
  }
};

// 사용자 미션 삭제
export const deleteUserMission = async (
  userMissionId: number
): Promise<void> => {
  try {
    await api.delete(`${API_CONFIG.ENDPOINTS.USER_MISSIONS}/${userMissionId}`);
  } catch (error) {
    console.error(
      `사용자 미션 삭제 실패 (userMissionId: ${userMissionId}):`,
      error
    );
    throw error;
  }
};

// 코스의 모든 사용자 미션 삭제
export const deleteAllUserMissionsForCourse = async (
  userId: number,
  courseId: number
): Promise<void> => {
  try {
    // 1. 코스 상세 정보 가져오기 (spots 포함)
    const courseDetail = await fetchCourseDetail(courseId);

    // 2. 각 spot의 미션들을 가져와서 사용자 미션 ID 찾기
    const allUserMissionIds: number[] = [];

    for (const spot of courseDetail.courseSpots) {
      try {
        const spotMissions = await fetchSpotMissions(spot.spotId);

        // 각 미션에 대해 사용자 미션 ID 찾기
        for (const mission of spotMissions) {
          try {
            // 사용자별 미션 조회하여 userMissionId 찾기
            const userMissions = await fetchUserMissionsByStatus(
              userId,
              "IN_PROGRESS"
            );
            const userMission = userMissions.find(
              (um) => um.missionId === mission.missionId
            );

            if (userMission) {
              allUserMissionIds.push(userMission.userMissionId);
            }
          } catch (missionError) {
            console.error(
              `미션 ${mission.missionId} 사용자 미션 조회 실패:`,
              missionError
            );
          }
        }
      } catch (spotError) {
        console.error(`Spot ${spot.spotId} 미션 조회 실패:`, spotError);
      }
    }

    // 3. 모든 사용자 미션 삭제
    if (allUserMissionIds.length > 0) {
      const deletePromises = allUserMissionIds.map((userMissionId) =>
        deleteUserMission(userMissionId)
      );

      await Promise.all(deletePromises);
      console.log(
        `${allUserMissionIds.length}개의 사용자 미션이 삭제되었습니다.`
      );
    } else {
      console.log("삭제할 사용자 미션이 없습니다.");
    }
  } catch (error) {
    console.error(`코스 ${courseId}의 모든 사용자 미션 삭제 실패:`, error);
    throw error;
  }
};

// API 인스턴스 내보내기 (다른 곳에서 사용할 경우)
export default api;
