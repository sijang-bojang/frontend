export type RegionKey = "전체" | "유성구" | "서구" | "중구" | "동구" | "대덕구";

// TourScreen에서 사용할 Market 타입 (API 타입과 호환)
export type Market = {
  id: number;
  name: string;
  region: string;
  fullRegion: string;
};

// 필터 관련 타입들
export type VehicleOption = "자차 보유" | "남의 차 보유" | "없음";
export type CompanionOption = "혼자" | "연인이랑" | "친구랑" | "가족이랑";
export type DurationOption = "당일치기" | "1박 2일" | "2박 3일" | "1시간 속성";
export type ThemeOption =
  | "디저트"
  | "밥"
  | "공방"
  | "걷기"
  | "뛰기"
  | "타슈 타기"
  | "노포";

export type TourFilters = {
  vehicle: VehicleOption[];
  companion: CompanionOption[];
  duration: DurationOption[];
  theme: ThemeOption[];
};

export type TourSettings = {
  selectedMarket: Market | null;
  filters: TourFilters;
};
