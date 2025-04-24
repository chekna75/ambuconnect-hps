import { HttpClient } from '../http/httpClient';
import { API_ENDPOINTS } from '@/constants/api';
import { CreateEtablissementDTO, Etablissement, StatsParams } from './types';
import { CreateUtilisateurDTO } from './types';
import { CreateMessageDTO } from './types';

export class EtablissementService {
  private static instance: EtablissementService;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  public static getInstance(): EtablissementService {
    if (!EtablissementService.instance) {
      EtablissementService.instance = new EtablissementService();
    }
    return EtablissementService.instance;
  }

  private getToken(): string | undefined {
    return localStorage.getItem('token') || undefined;
  }

  async createEtablissement(data: CreateEtablissementDTO): Promise<{ data: Etablissement }> {
    return this.httpClient.post(API_ENDPOINTS.ETABLISSEMENTS, data);
  }

  async getEtablissements(): Promise<{ data: Etablissement[] }> {
    return this.httpClient.get(API_ENDPOINTS.ETABLISSEMENTS, { token: this.getToken() });
  }

  async getEtablissementById(id: string): Promise<{ data: Etablissement }> {
    return this.httpClient.get(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}`, { token: this.getToken() });
  }

  async updateEtablissement(id: string, data: Partial<Etablissement>): Promise<{ data: Etablissement }> {
    return this.httpClient.put(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}`, data, { token: this.getToken() });
  }

  async deleteEtablissement(id: string): Promise<void> {
    return this.httpClient.delete(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}`, { token: this.getToken() });
  }

  async getEtablissementUsers(id: string): Promise<any[]> {
    return this.httpClient.get(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/users`, { token: this.getToken() });
  }

  async getStats(id: string, params: any): Promise<any> {
    return this.httpClient.get(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/stats`, { 
      params, 
      token: this.getToken() 
    });
  }

  async getUtilisateurs(id: string): Promise<any[]> {
    return this.httpClient.get(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/utilisateurs`, { token: this.getToken() });
  }

  async createUtilisateur(id: string, data: any): Promise<any> {
    return this.httpClient.post(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/utilisateurs`, data, { token: this.getToken() });
  }

  async deleteUtilisateur(id: string, userId: string): Promise<void> {
    return this.httpClient.delete(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/utilisateurs/${userId}`, { token: this.getToken() });
  }

  async createMessage(id: string, data: any): Promise<any> {
    return this.httpClient.post(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/messages`, data, { token: this.getToken() });
  }

  async activerEtablissement(id: string): Promise<Etablissement> {
    return this.httpClient.put(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/activer`, {}, { token: this.getToken() });
  }

  async desactiverEtablissement(id: string): Promise<Etablissement> {
    return this.httpClient.put(`${API_ENDPOINTS.ETABLISSEMENTS}/${id}/desactiver`, {}, { token: this.getToken() });
  }

  async searchEtablissements(query: string): Promise<Etablissement[]> {
    return this.httpClient.get('/etablissements/search', { 
      params: { q: query }, 
      token: this.getToken() 
    });
  }
}
