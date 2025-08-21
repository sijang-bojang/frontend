// API 관련 상수들
export const API_CONFIG = {
  // 환경 변수에서 백엔드 URL 가져오기
  BASE_URL: process.env.EXPO_PUBLIC_BACKEND_URL,

  // API 엔드포인트들
  ENDPOINTS: {
    MARKETS: "api/markets",
    SPOTS_BY_MARKET: "/api/spots/market",
    COURSE_RECOMMEND: "/api/courses/recommend",
  },

  // 타임아웃 설정 (밀리초)
  TIMEOUT: 10000,

  // 재시도 횟수
  RETRY_COUNT: 3,
} as const;
