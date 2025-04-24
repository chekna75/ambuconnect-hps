import { AxiosError } from 'axios';
import { BaseService, ApiResponse } from '../base/BaseService';
import { CreateEtablissementDTO, Etablissement, StatsParams } from './types';
import { CreateUtilisateurDTO } from './types';
import { CreateMessageDTO } from './types';

export class EtablissementService extends BaseService {
  private static instance: EtablissementService;

  private constructor() {
    super();
  }

  public static getInstance(): EtablissementService {
    if (!EtablissementService.instance) {
      EtablissementService.instance = new EtablissementService();
    }
    return EtablissementService.instance;
  }

  async createEtablissement(etablissementData: CreateEtablissementDTO): Promise<ApiResponse<Etablissement>> {
    try {
      const response = await this.api.post<ApiResponse<Etablissement>>(
        '/etablissements',
        etablissementData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getEtablissements(): Promise<ApiResponse<Etablissement[]>> {
    try {
      const response = await this.api.get<ApiResponse<Etablissement[]>>(
        '/etablissements'
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getEtablissementById(id: string): Promise<ApiResponse<Etablissement>> {
    try {
      const response = await this.api.get<ApiResponse<Etablissement>>(
        `/etablissements/${id}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async updateEtablissement(id: number, etablissementData: Partial<Etablissement>): Promise<ApiResponse<Etablissement>> {
    try {
      const response = await this.api.put<ApiResponse<Etablissement>>(
        `/etablissements/${id}`,
        etablissementData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async deleteEtablissement(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.delete<ApiResponse<void>>(
        `/etablissements/${id}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getEtablissementUsers(id: number): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.api.get<ApiResponse<any[]>>(
        `/etablissements/${id}/users`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getStats(id: string, params: StatsParams): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get<ApiResponse<any>>(
        `/etablissements/${id}/stats`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getUtilisateurs(id: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.api.get<ApiResponse<any[]>>(
        `/etablissements/${id}/utilisateurs`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async createUtilisateur(id: string, data: CreateUtilisateurDTO): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post<ApiResponse<any>>(
        `/etablissements/${id}/utilisateurs`,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async deleteUtilisateur(id: string, userId: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.delete<ApiResponse<void>>(
        `/etablissements/${id}/utilisateurs/${userId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async createMessage(id: string, data: CreateMessageDTO): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post<ApiResponse<any>>(
        `/etablissements/${id}/messages`,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async activerEtablissement(id: string): Promise<ApiResponse<Etablissement>> {
    try {
      const response = await this.api.put<ApiResponse<Etablissement>>(
        `/etablissements/${id}/activer`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async desactiverEtablissement(id: string): Promise<ApiResponse<Etablissement>> {
    try {
      const response = await this.api.put<ApiResponse<Etablissement>>(
        `/etablissements/${id}/desactiver`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async searchEtablissements(query: string): Promise<ApiResponse<Etablissement[]>> {
    try {
      const response = await this.api.get<ApiResponse<Etablissement[]>>(
        '/etablissements/search',
        { params: { q: query } }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
}
