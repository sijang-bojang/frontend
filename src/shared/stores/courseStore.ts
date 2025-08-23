import { create } from "zustand";
import { Course, fetchCourseDetail } from "../api";

interface CourseState {
  currentCourse: Course | null;
  detailedCourse: Course | null;
  isLoading: boolean;
  error: string | null;

  // 현재 코스 설정
  setCurrentCourse: (course: Course) => void;

  // 코스 상세 정보 가져오기
  fetchCourseDetail: (courseId: string) => Promise<void>;

  // 상태 초기화
  clearCourse: () => void;

  // 로딩 상태 설정
  setLoading: (loading: boolean) => void;

  // 에러 설정
  setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  currentCourse: null,
  detailedCourse: null,
  isLoading: false,
  error: null,

  setCurrentCourse: (course: Course) => {
    set({ currentCourse: course });
  },

  fetchCourseDetail: async (courseId: string) => {
    // 이미 같은 코스의 상세 정보가 있다면 API 호출하지 않음
    if (get().detailedCourse?.courseId === courseId) {
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const detailedData = await fetchCourseDetail(courseId);
      set({ detailedCourse: detailedData, isLoading: false });
    } catch (error) {
      console.error("코스 상세 정보 가져오기 실패:", error);
      set({
        error: "코스 정보를 가져오는데 실패했습니다.",
        isLoading: false,
      });

      // 실패 시 기본 데이터 사용
      const currentCourse = get().currentCourse;
      if (currentCourse) {
        set({ detailedCourse: currentCourse });
      }
    }
  },

  clearCourse: () => {
    set({
      currentCourse: null,
      detailedCourse: null,
      error: null,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
