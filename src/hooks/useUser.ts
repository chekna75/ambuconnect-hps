import { useState } from 'react';
import { UserService } from '@/services/user/userService';
import { UtilisateurEtablissementDto, CreateUserResponse } from '@/services/user/types';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userService = UserService.getInstance();

  const createUser = async (
    etablissementId: string,
    userData: Omit<UtilisateurEtablissementDto, 'etablissementId'>
  ): Promise<CreateUserResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await userService.createUser(etablissementId, userData);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser,
    isLoading,
    error
  };
}; 