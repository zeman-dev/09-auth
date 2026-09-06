import { type User } from '@/types/user';
import { create } from 'zustand';

interface AuthUser {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthUser = create<AuthUser>()(set => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
