# 시장 API 사용법

이 문서는 시장 관련 API 함수들의 사용법을 설명합니다.

## 설치

먼저 필요한 패키지를 설치하세요:

```bash
npm install @supabase/supabase-js
```

## 기본 사용법

### 1. 모든 시장 조회

```typescript
import { getAllMarkets } from "../shared/api";

try {
  const markets = await getAllMarkets();
  console.log("모든 시장:", markets);
} catch (error) {
  console.error("시장 조회 실패:", error);
}
```

### 2. 특정 시장 조회

```typescript
import { getMarketById } from "../shared/api";

try {
  const market = await getMarketById(1);
  console.log("시장 정보:", market);
} catch (error) {
  console.error("시장 조회 실패:", error);
}
```

### 3. 시장 검색

```typescript
import { searchMarkets } from "../shared/api";

// 텍스트 검색
const textSearchResult = await searchMarkets({
  query: "전통시장",
  limit: 10,
});

// 위치 기반 검색 (서울시청 기준 5km 반경)
const locationSearchResult = await searchMarkets({
  latitude: 37.5665,
  longitude: 126.978,
  radius: 5, // 5km
  limit: 20,
});

// 복합 검색
const complexSearchResult = await searchMarkets({
  query: "시장",
  latitude: 37.5665,
  longitude: 126.978,
  radius: 10,
  limit: 15,
  offset: 0,
});
```

### 4. 시장 생성

```typescript
import { createMarket } from "../shared/api";

try {
  const newMarket = await createMarket({
    name: "새로운 전통시장",
    address: "서울시 강남구 테헤란로 123",
    latitude: 37.5665,
    longitude: 126.978,
    description: "새롭게 오픈한 전통시장입니다.",
  });
  console.log("생성된 시장:", newMarket);
} catch (error) {
  console.error("시장 생성 실패:", error);
}
```

### 5. 시장 수정

```typescript
import { updateMarket } from "../shared/api";

try {
  const updatedMarket = await updateMarket(1, {
    name: "수정된 시장명",
    description: "설명이 수정되었습니다.",
  });
  console.log("수정된 시장:", updatedMarket);
} catch (error) {
  console.error("시장 수정 실패:", error);
}
```

### 6. 시장 삭제

```typescript
import { deleteMarket } from "../shared/api";

try {
  await deleteMarket(1);
  console.log("시장이 삭제되었습니다.");
} catch (error) {
  console.error("시장 삭제 실패:", error);
}
```

## 에러 처리

모든 API 함수는 에러가 발생할 경우 적절한 에러 메시지와 함께 예외를 발생시킵니다. try-catch 블록을 사용하여 에러를 처리하세요.

```typescript
try {
  const markets = await getAllMarkets();
  // 성공 처리
} catch (error) {
  if (error instanceof Error) {
    console.error("에러 메시지:", error.message);
  } else {
    console.error("알 수 없는 에러:", error);
  }
}
```

## 타입 정의

모든 API 함수는 TypeScript 타입을 지원합니다:

```typescript
import type {
  Market,
  CreateMarketRequest,
  UpdateMarketRequest,
} from "../shared/types/market";

// 타입 안전성 보장
const market: Market = await getMarketById(1);
const createData: CreateMarketRequest = {
  name: "새 시장",
  address: "주소",
  latitude: 37.5665,
  longitude: 126.978,
};
```

## 성능 최적화

- `limit`과 `offset`을 사용하여 페이지네이션 구현
- 위치 기반 검색 시 `radius` 파라미터 활용
- 필요한 경우에만 `count: 'exact'` 사용 (성능에 영향)
