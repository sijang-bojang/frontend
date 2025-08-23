import { create } from "zustand";
import { User } from "../types/user";
import {
  fetchUserById,
  updateUser,
  updateUserReward,
  updateUserExp,
} from "../api";

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;

  // 사용자 정보 설정
  setCurrentUser: (user: User) => void;

  // 사용자 정보 가져오기
  fetchUserData: (userId: number) => Promise<void>;

  // 사용자 정보 수정
  updateUserData: (userId: number, userData: Partial<User>) => Promise<void>;

  // 사용자 보상 포인트 업데이트
  updateUserRewardData: (userId: number, rewardPoints: number) => Promise<void>;

  // 사용자 경험치 업데이트
  updateUserExpData: (userId: number, exp: number) => Promise<void>;

  // 로그인 상태 설정
  loginAsUser: (userId: number) => Promise<void>;

  // 로그아웃
  logout: () => void;

  // 상태 초기화
  clearUser: () => void;

  // 로딩 상태 설정
  setLoading: (loading: boolean) => void;

  // 에러 설정
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  isLoading: false,
  error: null,

  setCurrentUser: (user: User) => {
    set({ currentUser: user });
  },

  fetchUserData: async (userId: number) => {
    try {
      set({ isLoading: true, error: null });
      const userData = await fetchUserById(userId);
      set({ currentUser: userData, isLoading: false });
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      set({
        error: "사용자 정보를 가져오는데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  updateUserData: async (userId: number, userData: Partial<User>) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await updateUser(userId, userData);
      set({ currentUser: updatedUser, isLoading: false });
    } catch (error) {
      console.error("사용자 정보 수정 실패:", error);
      set({
        error: "사용자 정보 수정에 실패했습니다.",
        isLoading: false,
      });
    }
  },

  updateUserRewardData: async (userId: number, rewardPoints: number) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await updateUserReward(userId, { rewardPoints });
      set({ currentUser: updatedUser, isLoading: false });
    } catch (error) {
      console.error("보상 포인트 업데이트 실패:", error);
      set({
        error: "보상 포인트 업데이트에 실패했습니다.",
        isLoading: false,
      });
    }
  },

  updateUserExpData: async (userId: number, exp: number) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await updateUserExp(userId, { exp });
      set({ currentUser: updatedUser, isLoading: false });
    } catch (error) {
      console.error("경험치 업데이트 실패:", error);
      set({
        error: "경험치 업데이트에 실패했습니다.",
        isLoading: false,
      });
    }
  },

  loginAsUser: async (userId: number) => {
    try {
      set({ isLoading: true, error: null });
      const userData = await fetchUserById(userId);
      set({ currentUser: userData, isLoading: false });
    } catch (error) {
      console.error("로그인 실패:", error);
      set({
        error: "로그인에 실패했습니다.",
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({ currentUser: null, error: null });
  },

  clearUser: () => {
    set({
      currentUser: null,
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
