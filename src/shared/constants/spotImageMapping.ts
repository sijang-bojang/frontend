// Spot ID와 Image ID 연결 매핑 테이블
export const SPOT_IMAGE_MAPPING: { [key: number]: number } = {
  1: 0,
  2: 17,
  3: 14,
  4: 18,
  5: 15,
  6: 10,
  7: 0, // image_id가 없는 경우 0으로 설정
  8: 0,
  9: 21,
  10: 1,
  11: 23,
  12: 7,
  13: 11,
  14: 25,
  15: 20,
  16: 8,
  17: 26,
  18: 13,
  19: 3,
  20: 27,
  21: 12,
  22: 24,
  23: 29,
  24: 28,
  25: 16,
  26: 4,
  27: 5,
};

// 특정 spot의 image_id를 가져오는 헬퍼 함수
export const getSpotImageId = (spotId: number): number => {
  return SPOT_IMAGE_MAPPING[spotId] || 0;
};

// image_id가 있는 spot인지 확인하는 헬퍼 함수
export const hasSpotImage = (spotId: number): boolean => {
  const imageId = SPOT_IMAGE_MAPPING[spotId];
  return imageId !== undefined && imageId > 0;
};
