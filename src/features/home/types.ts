export type Notice = {
  id: number;
  text: string;
};

export type HeroCard = {
  id: number | string;
  title: string;
  description?: string;
  ctaText?: string;
  colorClass?: string; // nativewind 배경색 클래스
};
