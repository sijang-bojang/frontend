export type RegionKey = "전체" | "유성구" | "서구" | "중구" | "동구" | "대덕구";

export type Market = {
  id: number;
  name: string;
  region: string;
  fullRegion: string;
};
