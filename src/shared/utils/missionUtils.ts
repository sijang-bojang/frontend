import { 
  completeUserMission, 
  updateUserCourseProgress, 
  completeUserCourse,
  fetchUserCourseProgress,
  fetchCourseDetail
} from '../api';

/**
 * 미션 완료 처리 및 코스 진행도 자동 업데이트
 * @param userId 사용자 ID
 * @param missionId 완료할 미션 ID
 * @returns 미션 완료 응답
 */
export const completeMissionAndUpdateCourse = async (
  userId: number, 
  missionId: number
) => {
  try {
    // 1. 미션 완료 처리
    console.log(`미션 완료 처리 시작: userId=${userId}, missionId=${missionId}`);
    const missionResult = await completeUserMission(userId, missionId);
    
    // 2. 사용자의 모든 코스 진행도 조회
    const userCourses = await fetchUserCourseProgress(userId);
    
    // 3. 진행 중인 코스들에 대해 체크
    for (const courseProgress of userCourses) {
      if (courseProgress.status === 'IN_PROGRESS') {
        console.log(`진행 중인 코스 체크: ${courseProgress.courseName}`);
        
        // 코스 상세 정보 조회하여 총 미션 수 확인
        const courseDetail = await fetchCourseDetail(courseProgress.courseId);
        
        // 현재 진행도 계산 (완료한 미션 수 기준)
        const currentStep = courseProgress.currentStep;
        const totalSteps = courseProgress.totalSteps;
        
        console.log(`코스 진행도: ${currentStep}/${totalSteps}`);
        
        // 미션이 완료되었으므로 다음 단계로 진행
        const nextStep = Math.min(currentStep + 1, totalSteps);
        
        if (nextStep > currentStep) {
          // 진행도 업데이트
          await updateUserCourseProgress(userId, courseProgress.courseId, nextStep);
          console.log(`코스 진행도 업데이트: ${courseProgress.courseName} -> ${nextStep}/${totalSteps}`);
          
          // 모든 미션이 완료되었으면 코스 완료 처리
          if (nextStep === totalSteps) {
            await completeUserCourse(userId, courseProgress.courseId);
            console.log(`코스 완료: ${courseProgress.courseName}`);
          }
        }
      }
    }
    
    return missionResult;
  } catch (error) {
    console.error('미션 완료 및 코스 업데이트 실패:', error);
    throw error;
  }
};

/**
 * 코스 시작 시 해당 코스의 미션들을 자동으로 시작
 * @param userId 사용자 ID  
 * @param courseId 시작할 코스 ID
 */
export const startCourseWithMissions = async (userId: number, courseId: number) => {
  try {
    console.log(`코스 및 미션 시작: userId=${userId}, courseId=${courseId}`);
    
    // 1. 코스 상세 정보 조회
    const courseDetail = await fetchCourseDetail(courseId);
    
    // 2. 코스의 스팟들에서 미션들을 찾아서 시작
    // 이 부분은 백엔드 API 설계에 따라 달라질 수 있습니다.
    // 현재는 코스 시작만 처리하고, 미션 시작은 사용자가 개별적으로 하도록 합니다.
    
    console.log(`코스 시작 완료: ${courseDetail.name}`);
    
    return courseDetail;
  } catch (error) {
    console.error('코스 및 미션 시작 실패:', error);
    throw error;
  }
};