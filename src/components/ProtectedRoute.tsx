import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion en conservant l'URL de destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 