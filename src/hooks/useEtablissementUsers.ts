import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EtablissementService } from '../services/etablissement/EtablissementService';
import type { CreateUtilisateurDTO } from '../services/etablissement/types';

export const useEtablissementUsers = (etablissementId: string) => {
  const queryClient = useQueryClient();
  const etablissementService = EtablissementService.getInstance();

  const { data: utilisateurs, isLoading, error } = useQuery({
    queryKey: ['etablissement', etablissementId, 'utilisateurs'],
    queryFn: () => etablissementService.getUtilisateurs(etablissementId)
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateUtilisateurDTO) => 
      etablissementService.createUtilisateur(etablissementId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['etablissement', etablissementId, 'utilisateurs']
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => 
      etablissementService.deleteUtilisateur(etablissementId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['etablissement', etablissementId, 'utilisateurs']
      });
    }
  });

  return {
    utilisateurs: utilisateurs?.data,
    isLoading,
    error,
    createUser: createMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending
  };
}; 