export interface LevelInfo {
  level: number;
  name: string;
  description: string;
  minExp: number;
  maxExp: number;
}

export const LEVEL_TABLE: LevelInfo[] = [
  {
    level: 1,
    name: "대전 새내기",
    description: "막 첫 발을 들인 초보 탐험가",
    minExp: 0,
    maxExp: 999,
  },
  {
    level: 2,
    name: "대전 손님",
    description: "시장을 오가며 구경을 시작한 단계",
    minExp: 1000,
    maxExp: 2999,
  },
  {
    level: 3,
    name: "대전 단골",
    description: "자주 방문하며 익숙해진 단계",
    minExp: 3000,
    maxExp: 5999,
  },
  {
    level: 4,
    name: "대전 탐험가",
    description: "새로운 미션과 코스에 도전하는 단계",
    minExp: 6000,
    maxExp: 9999,
  },
  {
    level: 5,
    name: "대전 애호가",
    description: "시장 문화를 즐기며 적극적으로 참여하는 단계",
    minExp: 10000,
    maxExp: 14999,
  },
  {
    level: 6,
    name: "대전 길잡이",
    description: "다른 사람들에게 시장을 안내할 수 있는 수준",
    minExp: 15000,
    maxExp: 21999,
  },
  {
    level: 7,
    name: "대전 고수",
    description: "숨은 명소까지 꿰뚫는 전문가",
    minExp: 22000,
    maxExp: 29999,
  },
  {
    level: 8,
    name: "대전 명인",
    description: "시장 사람들과 어깨를 나란히 하는 권위자",
    minExp: 30000,
    maxExp: 39999,
  },
  {
    level: 9,
    name: "대전 장인",
    description: "시장 문화를 대표하는 실력자",
    minExp: 40000,
    maxExp: 54999,
  },
  {
    level: 10,
    name: "대전 전설",
    description: "대전 전통시장의 산 증인, 궁극의 탐험가",
    minExp: 55000,
    maxExp: Infinity,
  },
];

// 경험치를 기반으로 현재 계급을 반환하는 함수
export const getLevelByExp = (exp: number): LevelInfo => {
  for (let i = LEVEL_TABLE.length - 1; i >= 0; i--) {
    if (exp >= LEVEL_TABLE[i].minExp) {
      return LEVEL_TABLE[i];
    }
  }
  return LEVEL_TABLE[0]; // 기본값: 1레벨
};

// 다음 계급까지 필요한 경험치를 계산하는 함수
export const getExpToNextLevel = (currentExp: number): number => {
  const currentLevel = getLevelByExp(currentExp);

  if (currentLevel.level >= 10) {
    return 0; // 최고 레벨
  }

  const nextLevel = LEVEL_TABLE.find(
    (level) => level.level === currentLevel.level + 1
  );
  if (!nextLevel) return 0;

  return nextLevel.minExp - currentExp;
};

// 현재 계급에서의 진행률을 계산하는 함수 (0-100%)
export const getLevelProgress = (currentExp: number): number => {
  const currentLevel = getLevelByExp(currentExp);

  if (currentLevel.level >= 10) {
    return 100; // 최고 레벨
  }

  const nextLevel = LEVEL_TABLE.find(
    (level) => level.level === currentLevel.level + 1
  );
  if (!nextLevel) return 100;

  const currentLevelExp = currentExp - currentLevel.minExp;
  const totalLevelExp = nextLevel.minExp - currentLevel.minExp;

  return Math.min(Math.round((currentLevelExp / totalLevelExp) * 100), 100);
};
