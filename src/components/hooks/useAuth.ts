import { create } from 'zustand';
import { authService } from '@/services/auth/authService';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const response = await authService.login(credentials);
    set({ user: response.user, isAuthenticated: true });
  },
  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },
})); 