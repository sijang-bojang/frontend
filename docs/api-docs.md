# API 명세서

## 기본 정보

- **Base URL**: `http://3.34.186.143:5000`
- **Content-Type**: `application/json`

---

## 1. 시장 (Market) API

### 1.1 모든 시장 조회

- **Method**: `GET`
- **URL**: `/api/markets`
- **Response**:

```json
[
  {
    "marketId": 1,
    "name": "대전 중앙 시장",
    "address": "대전광역시 동구 대전로 783",
    "latitude": 36.3308,
    "longitude": 127.4325,
    "description": "중구에 위치하는 시장",
    "courseCount": 2,
    "spotCount": 9
  }
]
```

### 1.2 특정 시장 조회

- **Method**: `GET`
- **URL**: `/api/markets/{marketId}`
- **Response**:

```json
{
  "marketId": 1,
  "name": "대전 중앙 시장",
  "address": "대전광역시 동구 대전로 783",
  "latitude": 36.3308,
  "longitude": 127.4325,
  "description": "중구에 위치하는 시장",
  "courseCount": 2,
  "spotCount": 9
}
```

### 1.3 시장 검색

- **Method**: `GET`
- **URL**: `/api/markets/search?name={name}&address={address}`
- **Parameters**:
  - `name` (optional): 시장명으로 검색
  - `address` (optional): 주소로 검색
- **Response**:

```json
[
  {
    "marketId": 1,
    "name": "대전 중앙 시장",
    "address": "대전광역시 동구 대전로 783",
    "latitude": 36.3308,
    "longitude": 127.4325,
    "description": "중구에 위치하는 시장",
    "courseCount": 2,
    "spotCount": 9
  }
]
```

### 1.4 시장 생성

- **Method**: `POST`
- **URL**: `/api/markets`
- **Request Body**:

```json
{
  "name": "시장명",
  "address": "주소",
  "latitude": 36.3308,
  "longitude": 127.4325,
  "description": "설명"
}
```

### 1.5 시장 수정

- **Method**: `PUT`
- **URL**: `/api/markets/{marketId}`
- **Request Body**:

```json
{
  "name": "수정된 시장명",
  "address": "수정된 주소",
  "latitude": 36.3308,
  "longitude": 127.4325,
  "description": "수정된 설명"
}
```

- **Response**: 수정된 MarketDto 객체

### 1.6 시장 삭제

- **Method**: `DELETE`
- **URL**: `/api/markets/{marketId}`

---

## 2. 코스 (Course) API

### 2.1 모든 코스 조회

- **Method**: `GET`
- **URL**: `/api/courses`
- **Response**:

```json
[
  {
    "courseId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "코스명",
    "description": "코스 설명",
    "typeNames": ["가족", "커플"],
    "spotCount": 5,
    "courseSpots": [...],
    "isFamilyCourse": true,
    "isCoupleCourse": false
  }
]
```

### 2.2 특정 코스 조회

- **Method**: `GET`
- **URL**: `/api/courses/{courseId}`
- **Response**:

```json
{
  "courseId": 1,
  "marketId": 1,
  "marketName": "대전 중앙 시장",
  "name": "코스명",
  "description": "코스 설명",
  "typeNames": ["가족", "커플"],
  "spotCount": 5,
  "courseSpots": [
    {
      "spotId": 1,
      "spotName": "스팟명",
      "order": 1
    }
  ],
  "isFamilyCourse": true,
  "isCoupleCourse": false
}
```

### 2.3 시장별 코스 조회

- **Method**: `GET`
- **URL**: `/api/courses/market/{marketId}`
- **Response**:

```json
[
  {
    "courseId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "코스명",
    "description": "코스 설명",
    "typeNames": ["가족", "커플"],
    "spotCount": 5,
    "courseSpots": [...],
    "isFamilyCourse": true,
    "isCoupleCourse": false
  }
]
```

### 2.4 코스 검색

- **Method**: `GET`
- **URL**: `/api/courses/search?name={name}&description={description}`
- **Parameters**:
  - `name` (optional): 코스명으로 검색
  - `description` (optional): 설명으로 검색
- **Response**:

```json
[
  {
    "courseId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "검색된 코스명",
    "description": "코스 설명",
    "typeNames": ["가족", "커플"],
    "spotCount": 5,
    "courseSpots": [...],
    "isFamilyCourse": true,
    "isCoupleCourse": false
  }
]
```

### 2.5 코스 생성

- **Method**: `POST`
- **URL**: `/api/courses`
- **Request Body**:

```json
{
  "marketId": 1,
  "name": "새로운 코스명",
  "description": "코스 설명",
  "isFamilyCourse": true,
  "isCoupleCourse": false
}
```

- **Response**: 생성된 CourseDto 객체

### 2.6 코스 수정

- **Method**: `PUT`
- **URL**: `/api/courses/{courseId}`
- **Request Body**:

```json
{
  "marketId": 1,
  "name": "수정된 코스명",
  "description": "수정된 코스 설명",
  "isFamilyCourse": true,
  "isCoupleCourse": false
}
```

- **Response**: 수정된 CourseDto 객체

### 2.7 코스 삭제

- **Method**: `DELETE`
- **URL**: `/api/courses/{courseId}`

### 2.8 AI 코스 추천 ⭐

- **Method**: `POST`
- **URL**: `/api/courses/recommend`
- **Request Body**:

```json
{
  "marketId": 1,
  "marketName": "대전 중앙 시장",
  "tags": ["가족", "맛집", "문화"]
}
```

- **Response**:

```json
{
  "courseId": 1,
  "courseName": "추천 코스명",
  "description": "코스 설명",
  "marketName": "대전 중앙 시장",
  "recommendationReason": "AI가 추천한 이유",
  "confidenceScore": 0.85
}
```

---

## 3. 사용자 코스 진행도 (UserCourseProgress) API

### 3.1 모든 사용자 코스 진행도 조회

- **Method**: `GET`
- **URL**: `/api/user-course-progress`
- **Response**:

```json
[
  {
    "id": 1,
    "userId": 1,
    "userName": "사용자명",
    "courseId": 1,
    "courseName": "코스명",
    "currentStep": 3,
    "status": "IN_PROGRESS",
    "startedAt": "2024-01-01T10:00:00",
    "completedAt": null,
    "progressPercentage": 60.0
  }
]
```

### 3.2 특정 진행도 조회

- **Method**: `GET`
- **URL**: `/api/user-course-progress/{id}`

### 3.3 사용자별 진행도 조회

- **Method**: `GET`
- **URL**: `/api/user-course-progress/user/{userId}`

### 3.4 사용자별 상태별 진행도 조회

- **Method**: `GET`
- **URL**: `/api/user-course-progress/user/{userId}/status/{status}`
- **Status Values**: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`

### 3.5 특정 사용자의 특정 코스 진행도 조회

- **Method**: `GET`
- **URL**: `/api/user-course-progress/user/{userId}/course/{courseId}`

### 3.6 코스 시작

- **Method**: `POST`
- **URL**: `/api/user-course-progress/start?userId={userId}&courseId={courseId}`
- **Parameters**:
  - `userId`: 사용자 ID
  - `courseId`: 코스 ID

### 3.7 진행도 업데이트

- **Method**: `PUT`
- **URL**: `/api/user-course-progress/progress?userId={userId}&courseId={courseId}&currentStep={currentStep}`
- **Parameters**:
  - `userId`: 사용자 ID
  - `courseId`: 코스 ID
  - `currentStep`: 현재 단계 (1-5)

### 3.8 코스 완료

- **Method**: `POST`
- **URL**: `/api/user-course-progress/complete?userId={userId}&courseId={courseId}`
- **Parameters**:
  - `userId`: 사용자 ID
  - `courseId`: 코스 ID

### 3.9 진행도 삭제

- **Method**: `DELETE`
- **URL**: `/api/user-course-progress/{id}`

---

## 4. 사용자 미션 (UserMission) API

### 4.1 모든 사용자 미션 조회

- **Method**: `GET`
- **URL**: `/api/user-missions`
- **Response**:

```json
[
  {
    "userMissionId": 1,
    "userId": 1,
    "missionId": 1,
    "status": "COMPLETED",
    "startedAt": "2024-01-01T10:00:00",
    "completedAt": "2024-01-01T12:00:00"
  }
]
```

### 4.2 특정 사용자 미션 조회

- **Method**: `GET`
- **URL**: `/api/user-missions/{userMissionId}`
- **Response**:

```json
{
  "userMissionId": 1,
  "userId": 1,
  "missionId": 1,
  "status": "COMPLETED",
  "startedAt": "2024-01-01T10:00:00",
  "completedAt": "2024-01-01T12:00:00"
}
```

### 4.3 사용자별 미션 조회

- **Method**: `GET`
- **URL**: `/api/user-missions/user/{userId}`
- **Response**:

```json
[
  {
    "userMissionId": 1,
    "userId": 1,
    "missionId": 1,
    "status": "COMPLETED",
    "startedAt": "2024-01-01T10:00:00",
    "completedAt": "2024-01-01T12:00:00"
  },
  {
    "userMissionId": 2,
    "userId": 1,
    "missionId": 2,
    "status": "IN_PROGRESS",
    "startedAt": "2024-01-01T14:00:00",
    "completedAt": null
  }
]
```

### 4.4 사용자별 상태별 미션 조회

- **Method**: `GET`
- **URL**: `/api/user-missions/user/{userId}/status/{status}`
- **Status Values**: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`
- **Response**:

```json
[
  {
    "userMissionId": 1,
    "userId": 1,
    "missionId": 1,
    "status": "COMPLETED",
    "startedAt": "2024-01-01T10:00:00",
    "completedAt": "2024-01-01T12:00:00"
  }
]
```

### 4.5 특정 사용자의 특정 미션 조회

- **Method**: `GET`
- **URL**: `/api/user-missions/user/{userId}/mission/{missionId}`
- **Response**:

```json
{
  "userMissionId": 1,
  "userId": 1,
  "missionId": 1,
  "status": "COMPLETED",
  "startedAt": "2024-01-01T10:00:00",
  "completedAt": "2024-01-01T12:00:00"
}
```

### 4.6 미션 시작

- **Method**: `POST`
- **URL**: `/api/user-missions/start?userId={userId}&missionId={missionId}`
- **Parameters**:
  - `userId`: 사용자 ID
  - `missionId`: 미션 ID
- **Response**:

```json
{
  "userMissionId": 1,
  "userId": 1,
  "missionId": 1,
  "status": "IN_PROGRESS",
  "startedAt": "2024-01-01T10:00:00",
  "completedAt": null
}
```

### 4.7 미션 완료

- **Method**: `POST`
- **URL**: `/api/user-missions/complete?userId={userId}&missionId={missionId}`
- **Parameters**:
  - `userId`: 사용자 ID
  - `missionId`: 미션 ID
- **Response**:

```json
{
  "userMissionId": 1,
  "userId": 1,
  "missionId": 1,
  "status": "COMPLETED",
  "startedAt": "2024-01-01T10:00:00",
  "completedAt": "2024-01-01T12:00:00"
}
```

### 4.8 사용자 미션 삭제

- **Method**: `DELETE`
- **URL**: `/api/user-missions/{userMissionId}`

---

## 5. 스팟 (Spot) API

### 5.1 모든 스팟 조회

- **Method**: `GET`
- **URL**: `/api/spots`
- **Response**:

```json
[
  {
    "spotId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "스팟명",
    "description": "스팟 설명",
    "category": "맛집",
    "latitude": 36.3308,
    "longitude": 127.4325,
    "imageUrl": "이미지 URL"
  }
]
```

### 5.2 특정 스팟 조회

- **Method**: `GET`
- **URL**: `/api/spots/{spotId}`
- **Response**:

```json
{
  "spotId": 1,
  "marketId": 1,
  "marketName": "대전 중앙 시장",
  "name": "스팟명",
  "description": "스팟 설명",
  "category": "맛집",
  "latitude": 36.3308,
  "longitude": 127.4325,
  "imageUrl": "이미지 URL"
}
```

### 5.2.1 스팟 정보 조회 (미션 정보 포함) ⭐

- **Method**: `GET`
- **URL**: `/api/spots/{spotId}`
- **Description**: 스팟의 기본 정보와 함께 연결된 미션 정보를 포함하여 조회
- **Response**:

```json
{
  "spotId": 1,
  "marketId": 1,
  "marketName": "대전 중앙 시장",
  "name": "개천식당",
  "category": "식당",
  "description": "자극적이지 않고 담백한 맛이 일품인 이북식 손만두 전문점입니다. '생활의 달인'에도 소개된 숨은 맛집으로, 슴슴한 만두국이 별미입니다.",
  "imageUrl": null,
  "latitude": 36.3287,
  "longitude": 127.4316,
  "missionCount": 1,
  "visitMissionTitles": ["생활의 달인 만두국 인증"],
  "courseNames": ["중앙시장 맛집 탐방 코스"]
}
```

### 5.2.2 스팟에 연결된 모든 미션 조회 ⭐

- **Method**: `GET`
- **URL**: `/api/spots/{spotId}/missions`
- **Description**: 특정 스팟에 연결된 모든 미션의 상세 정보를 조회
- **Response**:

```json
[
  {
    "missionId": 1,
    "title": "생활의 달인 만두국 인증",
    "description": "개천식당의 만두국을 먹고 인증 사진을 찍어주세요",
    "missionType": "PHOTO",
    "rewardPoints": 100,
    "spotId": 1,
    "spotName": "개천식당"
  },
  {
    "missionId": 2,
    "title": "맛집 리뷰 작성",
    "description": "개천식당의 음식에 대한 솔직한 리뷰를 작성해주세요",
    "missionType": "REVIEW",
    "rewardPoints": 50,
    "spotId": 1,
    "spotName": "개천식당"
  }
]
```

### 5.3 시장별 스팟 조회

- **Method**: `GET`
- **URL**: `/api/spots/market/{marketId}`
- **Response**:

```json
[
  {
    "spotId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "스팟명",
    "description": "스팟 설명",
    "category": "맛집",
    "latitude": 36.3308,
    "longitude": 127.4325,
    "imageUrl": "이미지 URL"
  }
]
```

### 5.4 카테고리별 스팟 조회

- **Method**: `GET`
- **URL**: `/api/spots/category/{category}`
- **Response**:

```json
[
  {
    "spotId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "맛집 스팟",
    "description": "맛집 스팟 설명",
    "category": "맛집",
    "latitude": 36.3308,
    "longitude": 127.4325,
    "imageUrl": "이미지 URL"
  }
]
```

### 5.5 스팟 검색

- **Method**: `GET`
- **URL**: `/api/spots/search?name={name}&category={category}&marketId={marketId}`
- **Parameters**:
  - `name` (optional): 스팟명으로 검색
  - `category` (optional): 카테고리로 검색
  - `marketId` (optional): 시장 ID로 검색
- **Response**:

```json
[
  {
    "spotId": 1,
    "marketId": 1,
    "marketName": "대전 중앙 시장",
    "name": "검색된 스팟명",
    "description": "스팟 설명",
    "category": "맛집",
    "latitude": 36.3308,
    "longitude": 127.4325,
    "imageUrl": "이미지 URL"
  }
]
```

### 5.6 스팟 생성

- **Method**: `POST`
- **URL**: `/api/spots`
- **Request Body**:

```json
{
  "marketId": 1,
  "name": "새로운 스팟명",
  "description": "스팟 설명",
  "category": "맛집",
  "latitude": 36.3308,
  "longitude": 127.4325,
  "imageUrl": "이미지 URL"
}
```

- **Response**: 생성된 SpotDto 객체

### 5.7 스팟 수정

- **Method**: `PUT`
- **URL**: `/api/spots/{spotId}`
- **Request Body**:

```json
{
  "marketId": 1,
  "name": "수정된 스팟명",
  "description": "수정된 스팟 설명",
  "category": "맛집",
  "latitude": 36.3308,
  "longitude": 127.4325,
  "imageUrl": "수정된 이미지 URL"
}
```

- **Response**: 수정된 SpotDto 객체

### 5.8 스팟 삭제

- **Method**: `DELETE`
- **URL**: `/api/spots/{spotId}`

---

## 6. 미션 (Mission) API

### 6.1 모든 미션 조회

- **Method**: `GET`
- **URL**: `/api/missions`
- **Response**:

```json
[
  {
    "missionId": 1,
    "title": "미션 제목",
    "description": "미션 설명",
    "missionType": "VISIT",
    "rewardPoints": 100,
    "spotId": 1,
    "spotName": "스팟명"
  }
]
```

### 6.2 특정 미션 조회

- **Method**: `GET`
- **URL**: `/api/missions/{missionId}`
- **Response**:

```json
{
  "missionId": 1,
  "title": "미션 제목",
  "description": "미션 설명",
  "missionType": "VISIT",
  "rewardPoints": 100,
  "spotId": 1,
  "spotName": "스팟명"
}
```

### 6.3 타입별 미션 조회

- **Method**: `GET`
- **URL**: `/api/missions/type/{missionType}`
- **Mission Types**: `VISIT`, `PHOTO`, `REVIEW`, `PURCHASE`
- **Response**:

```json
[
  {
    "missionId": 1,
    "title": "방문 미션",
    "description": "특정 스팟을 방문하세요",
    "missionType": "VISIT",
    "rewardPoints": 100,
    "spotId": 1,
    "spotName": "스팟명"
  }
]
```

### 6.4 미션 검색

- **Method**: `GET`
- **URL**: `/api/missions/search?title={title}&minRewardPoints={minRewardPoints}`
- **Parameters**:
  - `title` (optional): 미션 제목으로 검색
  - `minRewardPoints` (optional): 최소 보상 포인트
- **Response**:

```json
[
  {
    "missionId": 1,
    "title": "검색된 미션 제목",
    "description": "미션 설명",
    "missionType": "VISIT",
    "rewardPoints": 150,
    "spotId": 1,
    "spotName": "스팟명"
  }
]
```

### 6.5 미션 생성

- **Method**: `POST`
- **URL**: `/api/missions`
- **Request Body**:

```json
{
  "title": "새로운 미션 제목",
  "description": "미션 설명",
  "missionType": "VISIT",
  "rewardPoints": 100,
  "spotId": 1
}
```

- **Response**: 생성된 MissionDto 객체

### 6.6 미션 수정

- **Method**: `PUT`
- **URL**: `/api/missions/{missionId}`
- **Request Body**:

```json
{
  "title": "수정된 미션 제목",
  "description": "수정된 미션 설명",
  "missionType": "VISIT",
  "rewardPoints": 150,
  "spotId": 1
}
```

- **Response**: 수정된 MissionDto 객체

### 6.7 미션 삭제

- **Method**: `DELETE`
- **URL**: `/api/missions/{missionId}`

---

## 7. 사용자 (User) API

### 7.1 모든 사용자 조회

- **Method**: `GET`
- **URL**: `/api/users`
- **Response**:

```json
[
  {
    "userId": 1,
    "username": "사용자명",
    "email": "user@example.com",
    "rewardPoints": 500,
    "exp": 1000,
    "level": 5
  }
]
```

### 7.2 특정 사용자 조회

- **Method**: `GET`
- **URL**: `/api/users/{userId}`
- **Response**:

```json
{
  "userId": 1,
  "username": "사용자명",
  "email": "user@example.com",
  "rewardPoints": 500,
  "exp": 1000,
  "level": 5
}
```

### 7.3 사용자명으로 사용자 조회

- **Method**: `GET`
- **URL**: `/api/users/username/{username}`
- **Response**:

```json
{
  "userId": 1,
  "username": "사용자명",
  "email": "user@example.com",
  "rewardPoints": 500,
  "exp": 1000,
  "level": 5
}
```

### 7.4 이메일로 사용자 조회

- **Method**: `GET`
- **URL**: `/api/users/email/{email}`
- **Response**:

```json
{
  "userId": 1,
  "username": "사용자명",
  "email": "user@example.com",
  "rewardPoints": 500,
  "exp": 1000,
  "level": 5
}
```

### 7.5 사용자 생성

- **Method**: `POST`
- **URL**: `/api/users`
- **Request Body**:

```json
{
  "username": "새사용자",
  "email": "newuser@example.com",
  "password": "password123"
}
```

### 7.6 사용자 수정

- **Method**: `PUT`
- **URL**: `/api/users/{userId}`
- **Request Body**:

```json
{
  "username": "수정된 사용자명",
  "email": "updated@example.com",
  "password": "newpassword123"
}
```

- **Response**: 수정된 UserDto 객체

### 7.7 사용자 보상 포인트 업데이트

- **Method**: `PUT`
- **URL**: `/api/users/{userId}/reward?rewardPoints={rewardPoints}`
- **Parameters**:
  - `rewardPoints`: 추가할 보상 포인트
- **Response**:

```json
{
  "userId": 1,
  "username": "사용자명",
  "email": "user@example.com",
  "rewardPoints": 600,
  "exp": 1000,
  "level": 5
}
```

### 7.8 사용자 경험치 업데이트

- **Method**: `PUT`
- **URL**: `/api/users/{userId}/exp?exp={exp}`
- **Parameters**:
  - `exp`: 추가할 경험치
- **Response**:

```json
{
  "userId": 1,
  "username": "사용자명",
  "email": "user@example.com",
  "rewardPoints": 500,
  "exp": 1200,
  "level": 6
}
```

### 7.9 사용자 삭제

- **Method**: `DELETE`
- **URL**: `/api/users/{userId}`

---

## 상태 코드

- **200**: 성공
- **201**: 생성 성공
- **400**: 잘못된 요청
- **404**: 리소스를 찾을 수 없음
- **500**: 서버 내부 오류

---

## 주요 기능별 사용 예시

### 1. AI 코스 추천

```javascript
// 프론트엔드에서 AI 코스 추천 요청
const response = await fetch("http://3.34.186.143:5000/api/courses/recommend", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    marketId: 1,
    marketName: "대전 중앙 시장",
    tags: ["가족", "맛집", "문화"],
  }),
});
const recommendedCourse = await response.json();
```

### 2. 코스 진행도 업데이트

```javascript
// 사용자가 코스의 특정 단계를 완료했을 때
const response = await fetch(
  "http://3.34.186.143:5000/api/user-course-progress/progress?userId=1&courseId=1&currentStep=3",
  {
    method: "PUT",
  }
);
const updatedProgress = await response.json();
```

### 3. 미션 완료

```javascript
// 사용자가 미션을 완료했을 때
const response = await fetch(
  "http://3.34.186.143:5000/api/user-missions/complete?userId=1&missionId=1",
  {
    method: "POST",
  }
);
const completedMission = await response.json();
```

### 4. 스팟 미션 정보 조회 ⭐

```javascript
// 스팟의 미션 정보를 조회할 때
const response = await fetch("http://3.34.186.143:5000/api/spots/1");
const spotDetail = await response.json();

// 스팟에 연결된 모든 미션 조회
const missionsResponse = await fetch(
  "http://3.34.186.143:5000/api/spots/1/missions"
);
const spotMissions = await missionsResponse.json();

console.log("스팟 정보:", spotDetail);
console.log("연결된 미션들:", spotMissions);
```

---

## 주의사항

1. **Base URL**: 모든 API 호출 시 `http://3.34.186.143:5000`을 기본 URL로 사용
2. **Content-Type**: 모든 POST/PUT 요청 시 `application/json` 헤더 포함
3. **에러 처리**: 400, 404, 500 상태 코드에 대한 적절한 에러 처리 필요
4. **AI 추천**: 코스 추천 API는 OpenAI API를 사용하므로 응답 시간이 다소 걸릴 수 있음
5. **진행도 계산**: `progressPercentage`는 자동으로 계산되어 제공됨 (1-5단계 기준)
