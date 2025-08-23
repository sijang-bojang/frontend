// API 관련 상수들
export const API_CONFIG = {
  // 환경 변수에서 백엔드 URL 가져오기 (기본값 제공)
  BASE_URL: process.env.EXPO_PUBLIC_BACKEND_URL || "http://3.34.186.143:5000",

  // API 엔드포인트들
  ENDPOINTS: {
    MARKETS: "/api/markets",
    SPOTS_BY_MARKET: "/api/spots/market",
    SPOTS: "/api/spots",
    SPOT_MISSIONS: "/api/spots",
    COURSE_RECOMMEND: "/api/courses/recommend",
    COURSES_BY_MARKET: "/api/courses/market",
    COURSES: "/api/courses",
    // 사용자 관련 엔드포인트 추가
    USERS: "/api/users",
    USER_BY_ID: "/api/users",
    USER_BY_USERNAME: "/api/users/username",
    USER_BY_EMAIL: "/api/users/email",
    USER_REWARD: "/api/users",
    USER_EXP: "/api/users",
  },

  // 타임아웃 설정 (밀리초)
  TIMEOUT: 10000,

  // 재시도 횟수
  RETRY_COUNT: 3,
} as const;
