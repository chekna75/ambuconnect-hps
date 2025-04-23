import { create } from 'zustand';
import { AuthService } from '@/services/auth/AuthService';

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
    const authService = AuthService.getInstance();
    const response = await authService.login(credentials);
    set({ user: response.data, isAuthenticated: true });
  },
  logout: async () => {
    const authService = AuthService.getInstance();
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },
})); 