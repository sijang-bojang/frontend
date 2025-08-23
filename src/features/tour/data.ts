import {
  Market,
  RegionKey,
  VehicleOption,
  CompanionOption,
  SeasonOption,
  DurationOption,
  ThemeOption,
} from "./types";

export const DAEJEON_REGIONS: Exclude<RegionKey, "전체">[] = [
  "유성구",
  "서구",
  "중구",
  "동구",
  "대덕구",
];

export const MARKETS: Market[] = [
  {
    id: 1,
    name: "중앙시장 활성화구역",
    region: "동구",
    fullRegion: "동구 대전로 783",
    latitude: 36.3281,
    longitude: 127.4347,
  },
  {
    id: 2,
    name: "중앙메가프라자",
    region: "동구",
    fullRegion: "동구 중앙로200번길 99",
    latitude: 36.3275,
    longitude: 127.4352,
  },
  {
    id: 3,
    name: "신중앙",
    region: "동구",
    fullRegion: "동구 중앙로200번길 85",
    latitude: 36.3278,
    longitude: 127.4348,
  },
  {
    id: 4,
    name: "중앙도매",
    region: "동구",
    fullRegion: "동구 중앙로200번길 73",
  },
  {
    id: 5,
    name: "중앙종합",
    region: "동구",
    fullRegion: "동구 중앙로200번길 45",
  },
  {
    id: 6,
    name: "자유도매",
    region: "동구",
    fullRegion: "동구 중앙로200번길 36",
  },
  {
    id: 7,
    name: "대전도매",
    region: "동구",
    fullRegion: "동구 대전로791번길 3",
  },
  {
    id: 8,
    name: "중앙상가",
    region: "동구",
    fullRegion: "동구 대전로797번길 37",
  },
  {
    id: 9,
    name: "전통중앙도매",
    region: "동구",
    fullRegion: "동구 중앙로204번길 28-1",
  },
  {
    id: 10,
    name: "정원시장",
    region: "동구",
    fullRegion: "동구 중앙로194번길 33",
  },
  {
    id: 11,
    name: "원동 중앙로골목형상점가",
    region: "동구",
    fullRegion: "동구 중앙로200번길 70",
  },
  { id: 12, name: "대전상가", region: "동구", fullRegion: "동구 충무로 185" },
  { id: 13, name: "인동", region: "동구", fullRegion: "동구 대전천동로 450" },
  { id: 14, name: "신도", region: "동구", fullRegion: "동구 흥룡로37번길 9" },
  { id: 15, name: "용운", region: "동구", fullRegion: "동구 용운로 170" },
  { id: 16, name: "가양", region: "동구", fullRegion: "동구 매봉로 18" },
  {
    id: 17,
    name: "역전시장상점가",
    region: "동구",
    fullRegion: "동구 역전시장길 48",
  },
  {
    id: 18,
    name: "홍도시장상점가",
    region: "동구",
    fullRegion: "동구 홍도로9번길 20",
  },
  {
    id: 19,
    name: "역전지하도상가",
    region: "동구",
    fullRegion: "동구 대전로797번길 41",
  },
  {
    id: 20,
    name: "가오동골목형상점가",
    region: "동구",
    fullRegion: "동구 동구청로 101",
  },
  {
    id: 21,
    name: "용운동대학로골목형상점가",
    region: "동구",
    fullRegion: "동구 대학로 33",
  },
  {
    id: 22,
    name: "중부건어물골목형상점가",
    region: "동구",
    fullRegion: "동구 대전로813번길 54",
  },

  { id: 23, name: "오류", region: "중구", fullRegion: "중구 계백로 1691-10" },
  { id: 24, name: "태평", region: "중구", fullRegion: "중구 수침로55번길 56" },
  {
    id: 25,
    name: "유천",
    region: "중구",
    fullRegion: "중구 문화로105번길 113",
  },
  { id: 26, name: "문창", region: "중구", fullRegion: "중구 대전천서로 279" },
  {
    id: 27,
    name: "산성뿌리",
    region: "중구",
    fullRegion: "중구 대둔산로408번길 28",
  },
  { id: 28, name: "용두", region: "중구", fullRegion: "중구 계룡로881번길 53" },
  { id: 29, name: "부사", region: "중구", fullRegion: "중구 대종로316번길 16" },
  {
    id: 30,
    name: "중앙로지하도상점가",
    region: "중구",
    fullRegion: "중구 중앙로지하도 145",
  },
  {
    id: 31,
    name: "문화예술의거리은행동상점가",
    region: "중구",
    fullRegion: "중구 중교로 83 3층",
  },
  {
    id: 32,
    name: "문화예술의거리대흥동상점가",
    region: "중구",
    fullRegion: "중구 중앙로38번길 30",
  },
  {
    id: 33,
    name: "오류특화상점가",
    region: "중구",
    fullRegion: "중구 계룡로874번길 13",
  },
  {
    id: 34,
    name: "중촌맞춤상점가",
    region: "중구",
    fullRegion: "중구 동서대로1421번길 33",
  },
  {
    id: 35,
    name: "충무자동차상점가",
    region: "중구",
    fullRegion: "중구 충무로 122-1",
  },
  {
    id: 36,
    name: "선화동음식특화거리골목형상점가",
    region: "중구",
    fullRegion: "중구 대종로 505번길 28",
  },
  {
    id: 37,
    name: "용두동미르길골목형상점가",
    region: "중구",
    fullRegion: "중구 중앙로 13번길 68",
  },

  { id: 38, name: "한민", region: "서구", fullRegion: "서구 도솔로308번길 27" },
  { id: 39, name: "도마큰", region: "서구", fullRegion: "서구 도마5길 46" },
  {
    id: 40,
    name: "가수원상점가",
    region: "서구",
    fullRegion: "서구 벌곡로1379번길 17-15",
  },
  {
    id: 41,
    name: "둔산3동상점가",
    region: "서구",
    fullRegion: "서구 문정로170번길 74",
  },
  {
    id: 42,
    name: "마치광장골목형상점가",
    region: "서구",
    fullRegion: "서구 구봉로 131번길 38",
  },

  {
    id: 43,
    name: "유성시장골목형상점가",
    region: "유성구",
    fullRegion: "유성구 유성대로730번길 24",
  },
  { id: 44, name: "송강", region: "유성구", fullRegion: "유성구 구즉로 74-7" },

  { id: 45, name: "송촌", region: "대덕구", fullRegion: "대덕구 동춘당로 83" },
  {
    id: 46,
    name: "중리",
    region: "대덕구",
    fullRegion: "대덕구 중리남로40번길 86 201호",
  },
  {
    id: 47,
    name: "법동",
    region: "대덕구",
    fullRegion: "대덕구 계족로 608번길 23-1",
  },
  {
    id: 48,
    name: "신탄진",
    region: "대덕구",
    fullRegion: "대덕구 석봉로 37번길 46-16",
  },
  {
    id: 49,
    name: "오정동상점가",
    region: "대덕구",
    fullRegion: "대덕구 오정로 106",
  },
  {
    id: 50,
    name: "송촌동상점가",
    region: "대덕구",
    fullRegion: "대덕구 계족산로81번길 54",
  },
  {
    id: 51,
    name: "중리동골목형상점가",
    region: "대덕구",
    fullRegion: "대덕구 중리남로 38-1",
  },
  {
    id: 52,
    name: "비래동골목형상점가",
    region: "대덕구",
    fullRegion: "대덕구 비래동로 1",
  },
];

export const FILTER_OPTIONS = {
  vehicle: [
    "자차 보유",
    "대중교통",
    "자전거/킥보드 이용",
    "걷기",
  ] as VehicleOption[],
  companion: [
    "혼자",
    "연인",
    "친구",
    "가족",
    "반려동물",
    "기타",
  ] as CompanionOption[],
  season: ["봄", "여름", "겨울", "가을", "기타"] as SeasonOption[],
  duration: [
    "1시간",
    "2시간",
    "3시간",
    "1박2일",
    "2박3일",
    "기간 상관없음",
  ] as DurationOption[],
  theme: [
    "디저트",
    "빵",
    "공방",
    "노포",
    "흥정",
    "동네산책",
    "핫플레이스",
    "소품샵",
    "길거리음식",
    "책",
    "음악",
  ] as ThemeOption[],
};

export const FILTER_LABELS = {
  vehicle: "이동은",
  companion: "누구랑",
  season: "계절은",
  duration: "투어 기간",
  theme: "테마 (복수선택 가능)",
};

export const getMarketsByRegion = (region: RegionKey): Market[] => {
  if (region === "전체") return MARKETS;
  return MARKETS.filter((m) => m.region === region);
};

export const searchMarkets = (keyword: string, region: RegionKey): Market[] => {
  const pool = getMarketsByRegion(region);
  if (!keyword.trim()) return pool;
  const q = keyword.trim().toLowerCase();
  return pool.filter(
    (m) =>
      m.name.toLowerCase().includes(q) || m.fullRegion.toLowerCase().includes(q)
  );
};
