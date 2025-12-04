// store/authStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  // 로그인
  login: (userData) => set({ 
    user: userData, 
    isAuthenticated: true 
  }),
  
  // 로그아웃
  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),
  
  // 사용자 정보 업데이트
  updateUser: (userData) => set({ 
    user: userData 
  })
}));