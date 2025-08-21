## 🚀 API 엔드포인트

### Markets

- `GET /api/markets` - 모든 시장 조회 (MarketDto 반환)
- `GET /api/markets/{marketId}` - 특정 시장 조회 (MarketDto 반환)
- `GET /api/markets/search` - 시장 검색 (MarketDto 리스트 반환)
- `POST /api/markets` - 시장 생성 (MarketDto 반환)
- `PUT /api/markets/{marketId}` - 시장 수정 (MarketDto 반환)
- `DELETE /api/markets/{marketId}` - 시장 삭제

### Courses

- `GET /api/courses` - 모든 코스 조회 (CourseDto 반환)
- `GET /api/courses/{courseId}` - 특정 코스 조회 (CourseDto 반환)
- `GET /api/courses/market/{marketId}` - 시장별 코스 조회 (CourseDto 리스트 반환)
- `GET /api/courses/search` - 코스 검색 (CourseDto 리스트 반환)
- `POST /api/courses` - 코스 생성 (CourseDto 반환)
- `PUT /api/courses/{courseId}` - 코스 수정 (CourseDto 반환)
- `DELETE /api/courses/{courseId}` - 코스 삭제
- `POST /api/courses/recommend` - AI 코스 추천 (CourseRecommendationResponse 반환)

### Users

- `GET /api/users` - 모든 사용자 조회 (UserDto 반환)
- `GET /api/users/{userId}` - 특정 사용자 조회 (UserDto 반환)
- `GET /api/users/username/{username}` - 사용자명으로 조회 (UserDto 반환)
- `GET /api/users/email/{email}` - 이메일로 조회 (UserDto 반환)
- `POST /api/users` - 사용자 생성 (UserDto 반환)
- `PUT /api/users/{userId}` - 사용자 수정 (UserDto 반환)
- `PUT /api/users/{userId}/reward` - 보상 포인트 업데이트 (UserDto 반환)
- `PUT /api/users/{userId}/exp` - 경험치 업데이트 (UserDto 반환)
- `DELETE /api/users/{userId}` - 사용자 삭제

### Missions

- `GET /api/missions` - 모든 미션 조회 (MissionDto 반환)
- `GET /api/missions/{missionId}` - 특정 미션 조회 (MissionDto 반환)
- `GET /api/missions/type/{missionType}` - 타입별 미션 조회 (MissionDto 리스트 반환)
- `GET /api/missions/search` - 미션 검색 (MissionDto 리스트 반환)
- `POST /api/missions` - 미션 생성 (MissionDto 반환)
- `PUT /api/missions/{missionId}` - 미션 수정 (MissionDto 반환)
- `DELETE /api/missions/{missionId}` - 미션 삭제

### User Missions

- `GET /api/user-missions` - 모든 사용자 미션 조회 (UserMissionDto 반환)
- `GET /api/user-missions/user/{userId}` - 사용자별 미션 조회 (UserMissionDto 리스트 반환)
- `GET /api/user-missions/user/{userId}/status/{status}` - 상태별 미션 조회 (UserMissionDto 리스트 반환)
- `POST /api/user-missions/start` - 미션 시작 (UserMissionDto 반환)
- `POST /api/user-missions/complete` - 미션 완료 (UserMissionDto 반환)

### User Course Progress

- `GET /api/user-course-progress` - 모든 코스 진행 상황 조회 (UserCourseProgressDto 반환)
- `GET /api/user-course-progress/user/{userId}` - 사용자별 코스 진행 상황 (UserCourseProgressDto 리스트 반환)
- `POST /api/user-course-progress/start` - 코스 시작 (UserCourseProgressDto 반환)
- `PUT /api/user-course-progress/progress` - 코스 진행 단계 업데이트 (UserCourseProgressDto 반환)
- `POST /api/user-course-progress/complete` - 코스 완료 (UserCourseProgressDto 반환)
