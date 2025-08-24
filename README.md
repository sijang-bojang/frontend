# 시장보장 (Sijang-bojang)

**멋쟁이사자처럼 13기 충남대 3조 해커톤 프로젝트**

대전 전통시장을 활용한 모바일 투어 가이드 앱입니다. AI 기반 코스 추천과 미션 완료를 통해 사용자가 전통시장을 더 재미있고 의미있게 탐험할 수 있도록 도와줍니다.

## 📱 주요 기능

### 🏠 홈 화면

- 전통시장 투어 소개
- AI 코스 추천 바로가기
- 공지사항 및 이벤트 정보

### 🗺️ 투어 기능

- **지역 선택**: 대전광역시 내 구별 시장 선택
- **AI 코스 추천**: 사용자 선호도에 따른 맞춤형 코스 생성
- **필터링**: 교통수단, 동반자, 소요시간, 테마별 코스 추천
- **실시간 경로 안내**: 시장 내 최적 경로 제공

### 🎯 미션 시스템

- **방문형 미션**: 특정 장소 방문 완료
- **비방문형 미션**: 퀴즈, 사진 촬영 등 다양한 활동
- **진행도 추적**: 실시간 미션 완료 상태 확인
- **보상 시스템**: 경험치 및 리워드 포인트 획득

### 🗺️ 지도 서비스

- **실시간 위치**: 현재 위치 기반 주변 정보 제공
- **스팟 정보**: 각 장소별 상세 정보 및 미션 현황

### 👤 사용자 프로필

- 개인 진행도 및 통계
- 획득한 보상 및 레벨 시스템

## 🛠️ 기술 스택

### Frontend

- **React Native** (0.79.5) - 크로스플랫폼 모바일 개발
- **Expo** (~53.0.20) - 개발 도구 및 배포 플랫폼
- **TypeScript** (~5.8.3) - 타입 안전성 보장
- **React Navigation** (7.x) - 화면 네비게이션
- **Zustand** (5.0.7) - 상태 관리

### UI/UX

- **NativeWind** (4.1.23) - Tailwind CSS for React Native
- **Expo Linear Gradient** - 그라데이션 효과
- **Expo Image** - 최적화된 이미지 처리
- **React Native Reanimated** - 부드러운 애니메이션

### 위치 서비스

- **Expo Location** - GPS 및 위치 서비스
- **Kakao Map API** - 지도 및 주소 변환 서비스

### 네트워킹

- **Axios** (1.11.0) - HTTP 클라이언트
- **REST API** - 백엔드 서버 통신

## 📁 프로젝트 구조

```
src/
├── features/              # 기능별 모듈
│   ├── home/             # 홈 화면
│   ├── tour/             # 투어 관련 기능
│   ├── mission/          # 미션 시스템
│   ├── map/              # 지도 서비스
│   └── profile/          # 사용자 프로필
├── shared/               # 공통 모듈
│   ├── api/             # API 통신
│   ├── components/      # 재사용 가능한 컴포넌트
│   ├── constants/       # 상수 정의
│   ├── hooks/          # 커스텀 훅
│   ├── stores/         # 상태 관리
│   ├── types/          # 타입 정의
│   └── utils/          # 유틸리티 함수
└── assets/              # 정적 리소스
    ├── images/         # 이미지 파일
    └── fonts/          # 폰트 파일
```

## 🚀 시작하기

### 전제조건

- Node.js (18.x 이상)
- npm 또는 yarn
- Expo CLI
- Android Studio (Android 개발 시)
- Xcode (iOS 개발 시)

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   ```

2. **개발 서버 시작**

   ```bash
   npm start
   # 또는
   npx expo start
   ```

3. **플랫폼별 실행**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # 웹 (개발용)
   npm run web
   ```

### 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경변수를 설정하세요:

```env
EXPO_PUBLIC_KAKAO_REST_API_KEY=your_kakao_api_key
EXPO_PUBLIC_API_BASE_URL=your_backend_api_url
```

## 📝 개발 가이드

### 코드 품질

```bash
# ESLint 검사
npm run lint
```

### 파일 구조 규칙

- **Features**: 기능별로 독립적인 모듈 구성
- **Components**: 재사용 가능한 UI 컴포넌트
- **Hooks**: 비즈니스 로직을 캡슐화한 커스텀 훅
- **Types**: TypeScript 타입 정의
- **Utils**: 순수 함수로 구성된 유틸리티

### 상태 관리

- **Zustand**: 전역 상태 관리 (사용자 정보, 코스 데이터)
- **React State**: 컴포넌트 로컬 상태
- **AsyncStorage**: 영구 저장이 필요한 데이터

## 🎨 디자인 시스템

- **색상**: Tailwind CSS 팔레트 기반
- **타이포그래피**: ChosunCentennial (한글), SpaceMono (영문)
- **컴포넌트**: 일관된 디자인 패턴 적용

## 📊 API 연동

백엔드 API와의 통신은 `src/shared/api/index.ts`에서 관리됩니다:

- **시장 정보**: 전통시장 목록 및 상세 정보
- **코스 관리**: AI 추천 코스 및 사용자 코스 진행도
- **미션 시스템**: 미션 생성, 진행, 완료 처리
- **사용자 관리**: 회원 정보 및 보상 시스템
