export type RegionKey = "전체" | "유성구" | "서구" | "중구" | "동구" | "대덕구";

// TourScreen에서 사용할 Market 타입 (API 타입과 호환)
export type Market = {
  marketId: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  courseCount?: number;
  spotCount?: number;
  // 기존 코드와의 호환성을 위한 필드들
  id?: number;
  region?: string;
  fullRegion?: string;
};

// 스팟 상세 정보 타입 (미션 정보 포함)
export type SpotDetail = {
  spotId: number;
  marketId: number;
  marketName: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string | null;
  latitude: number;
  longitude: number;
  missionCount: number;
  visitMissionTitles: string[];
  courseNames: string[];
};

// 스팟 미션 정보 타입
export type SpotMission = {
  missionId: number;
  title: string;
  description: string;
  missionType: "VISIT" | "PHOTO" | "REVIEW" | "PURCHASE";
  rewardPoints: number;
  spotId: number;
  spotName: string;
};

// 필터 관련 타입들
export type VehicleOption =
  | "자차 보유"
  | "자전거/킥보드 이용"
  | "걷기"
  | "직접 입력하기";

export type CompanionOption =
  | "혼자"
  | "연인이랑"
  | "친구랑"
  | "가족이랑"
  | "직접 입력하기";

export type SeasonOption =
  | "여름"
  | "봄"
  | "겨울"
  | "가을"
  | "기타"
  | "직접 입력하기";

export type DurationOption =
  | "1시간"
  | "2시간"
  | "3시간"
  | "1박2일"
  | "2박3일"
  | "직접 입력하기";

export type ThemeOption =
  | "디저트"
  | "빵"
  | "공방"
  | "노포"
  | "흥정"
  | "동네산책"
  | "핫플레이스"
  | "소품샵"
  | "길거리음식"
  | "책"
  | "음악"
  | "직접 입력하기";

export type TourFilters = {
  vehicle: VehicleOption[];
  companion: CompanionOption[];
  season: SeasonOption[];
  duration: DurationOption[];
  theme: ThemeOption[];
};

export type TourSettings = {
  selectedMarket: Market | null;
  filters: TourFilters;
};
