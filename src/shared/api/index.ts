import axios from "axios";
import { Market } from "../../features/tour/types";
import { Spot } from "../types/market";
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
    order: number;
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

// API 인스턴스 내보내기 (다른 곳에서 사용할 경우)
export default api;
