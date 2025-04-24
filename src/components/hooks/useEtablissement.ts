import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EtablissementService } from '@/services/etablissement/EtablissementService';
import { CreateEtablissementDTO, StatsParams, UpdateEtablissementDTO } from '@/services/etablissement/types';

export const useEtablissement = (id?: string) => {
  const queryClient = useQueryClient();
  const etablissementService = EtablissementService.getInstance();

  // Récupérer un établissement
  const { data: etablissement, isLoading, error } = useQuery({
    queryKey: ['etablissement', id],
    queryFn: () => etablissementService.getEtablissementById(id!),
    enabled: !!id
  });

  // Créer un établissement
  const createMutation = useMutation({
    mutationFn: (data: CreateEtablissementDTO) => etablissementService.createEtablissement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etablissements'] });
    }
  });

  // Mettre à jour un établissement
  const updateMutation = useMutation({
    mutationFn: (data: UpdateEtablissementDTO) => 
      etablissementService.updateEtablissement(Number(id!), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etablissement', id] });
      queryClient.invalidateQueries({ queryKey: ['etablissements'] });
    }
  });

  return {
    etablissement: etablissement?.data,
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending
  };
};

export const useEtablissementSearch = (query: string) => {
  const etablissementService = EtablissementService.getInstance();

  return useQuery({
    queryKey: ['etablissements', 'search', query],
    queryFn: () => etablissementService.getEtablissements(),
    enabled: query.length > 0
  });
};

export const useEtablissementStats = (id: string, params: StatsParams) => {
  const etablissementService = EtablissementService.getInstance();

  return useQuery({
    queryKey: ['etablissement', id, 'stats', params],
    queryFn: () => etablissementService.getStats(id, params)
  });
}; 