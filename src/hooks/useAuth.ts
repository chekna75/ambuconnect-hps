import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    etablissementId: string;
  } | null;
  token: string | null;
  login: (userData: { user: AuthState['user']; token: string }) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData.user,
          token: userData.token,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 