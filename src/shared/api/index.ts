import axios from "axios";
import { Market } from "../../features/tour/types";
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

// API 인스턴스 내보내기 (다른 곳에서 사용할 경우)
export default api;
