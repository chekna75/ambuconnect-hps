import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService, LoginCredentials } from '../services/auth/AuthService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authService = AuthService.getInstance();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      // Invalider et refetch les queries qui nécessitent une authentification
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/dashboard');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Réinitialiser le cache complet après la déconnexion
      queryClient.clear();
      navigate('/login');
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error: loginMutation.error || logoutMutation.error,
    isAuthenticated: authService.isAuthenticated(),
  };
}; 