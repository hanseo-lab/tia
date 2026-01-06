import { create } from 'zustand';

const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    theme: 'light',

    login: (userData) => set({ user: userData, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useStore;
