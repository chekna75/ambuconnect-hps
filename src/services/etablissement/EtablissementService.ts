import { BaseService, ApiResponse } from '../base/BaseService';
import { z } from 'zod';
import {
  Etablissement,
  CreateEtablissementDTO,
  UpdateEtablissementDTO,
  EtablissementStats,
  StatsParams,
  etablissementSchema,
  createEtablissementSchema,
  updateEtablissementSchema,
  statsSchema,
  statsParamsSchema,
  Utilisateur,
  CreateUtilisateurDTO,
  utilisateurSchema,
  createUtilisateurSchema,
  DemandeTransport,
  CreateDemandeTransportDTO,
  UpdateDemandeStatusDTO,
  FiltresDemandes,
  demandeTransportSchema,
  createDemandeTransportSchema,
  updateDemandeStatusSchema,
  filtreDemandesSchema,
  Configuration,
  CreateConfigurationDTO,
  UpdateConfigurationDTO,
  configurationSchema,
  createConfigurationSchema,
  updateConfigurationSchema,
  Message,
  CreateMessageDTO,
  messageSchema,
  createMessageSchema
} from './types';

export class EtablissementService extends BaseService {
  private static instance: EtablissementService;
  private readonly baseUrl = '/api/v1/etablissements';

  private constructor() {
    super();
  }

  public static getInstance(): EtablissementService {
    if (!EtablissementService.instance) {
      EtablissementService.instance = new EtablissementService();
    }
    return EtablissementService.instance;
  }

  async getEtablissement(id: string): Promise<ApiResponse<Etablissement>> {
    const response = await this.api.get(`${this.baseUrl}/${id}`);
    const etablissement = this.validate(etablissementSchema, response.data);
    return { data: etablissement, status: response.status };
  }

  async createEtablissement(data: CreateEtablissementDTO): Promise<ApiResponse<Etablissement>> {
    const validatedData = this.validate(createEtablissementSchema, data);
    const response = await this.api.post(this.baseUrl, validatedData);
    const etablissement = this.validate(etablissementSchema, response.data);
    return { data: etablissement, status: response.status };
  }

  async updateEtablissement(id: string, data: UpdateEtablissementDTO): Promise<ApiResponse<Etablissement>> {
    const validatedData = this.validate(updateEtablissementSchema, data);
    const response = await this.api.put(`${this.baseUrl}/${id}`, validatedData);
    const etablissement = this.validate(etablissementSchema, response.data);
    return { data: etablissement, status: response.status };
  }

  async searchEtablissements(query: string): Promise<ApiResponse<Etablissement[]>> {
    const response = await this.api.get(`${this.baseUrl}/search`, { params: { query } });
    const etablissements = this.validate(z.array(etablissementSchema), response.data);
    return { data: etablissements, status: response.status };
  }

  async activerEtablissement(id: string): Promise<ApiResponse<Etablissement>> {
    const response = await this.api.put(`${this.baseUrl}/${id}/activer`);
    const etablissement = this.validate(etablissementSchema, response.data);
    return { data: etablissement, status: response.status };
  }

  async desactiverEtablissement(id: string): Promise<ApiResponse<Etablissement>> {
    const response = await this.api.put(`${this.baseUrl}/${id}/desactiver`);
    const etablissement = this.validate(etablissementSchema, response.data);
    return { data: etablissement, status: response.status };
  }

  async getStats(id: string, params: StatsParams): Promise<ApiResponse<EtablissementStats>> {
    const validatedParams = this.validate(statsParamsSchema, params);
    const response = await this.api.get(`${this.baseUrl}/${id}/stats`, { params: validatedParams });
    const stats = this.validate(statsSchema, response.data);
    return { data: stats, status: response.status };
  }

  // Méthodes utilisateurs
  async getUtilisateurs(etablissementId: string): Promise<ApiResponse<Utilisateur[]>> {
    const response = await this.api.get(`${this.baseUrl}/${etablissementId}/utilisateurs`);
    const utilisateurs = this.validate(z.array(utilisateurSchema), response.data);
    return { data: utilisateurs, status: response.status };
  }

  async createUtilisateur(etablissementId: string, data: CreateUtilisateurDTO): Promise<ApiResponse<Utilisateur>> {
    const validatedData = this.validate(createUtilisateurSchema, data);
    const response = await this.api.post(`${this.baseUrl}/${etablissementId}/utilisateurs`, validatedData);
    const utilisateur = this.validate(utilisateurSchema, response.data);
    return { data: utilisateur, status: response.status };
  }

  async deleteUtilisateur(etablissementId: string, userId: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`${this.baseUrl}/${etablissementId}/utilisateurs/${userId}`);
    return { data: undefined, status: response.status };
  }

  // Méthodes demandes de transport
  async getDemandes(etablissementId: string, filtres?: FiltresDemandes): Promise<ApiResponse<DemandeTransport[]>> {
    const validatedFiltres = filtres ? this.validate(filtreDemandesSchema, filtres) : undefined;
    const response = await this.api.get(`${this.baseUrl}/${etablissementId}/demandes`, {
      params: validatedFiltres
    });
    const demandes = this.validate(z.array(demandeTransportSchema), response.data);
    return { data: demandes, status: response.status };
  }

  async getDemande(etablissementId: string, demandeId: string): Promise<ApiResponse<DemandeTransport>> {
    const response = await this.api.get(`${this.baseUrl}/${etablissementId}/demandes/${demandeId}`);
    const demande = this.validate(demandeTransportSchema, response.data);
    return { data: demande, status: response.status };
  }

  async createDemande(etablissementId: string, data: CreateDemandeTransportDTO): Promise<ApiResponse<DemandeTransport>> {
    const validatedData = this.validate(createDemandeTransportSchema, data);
    const response = await this.api.post(`${this.baseUrl}/${etablissementId}/demandes`, validatedData);
    const demande = this.validate(demandeTransportSchema, response.data);
    return { data: demande, status: response.status };
  }

  async updateDemandeStatus(
    etablissementId: string, 
    demandeId: string, 
    data: UpdateDemandeStatusDTO
  ): Promise<ApiResponse<DemandeTransport>> {
    const validatedData = this.validate(updateDemandeStatusSchema, data);
    const response = await this.api.put(
      `${this.baseUrl}/${etablissementId}/demandes/${demandeId}/status`,
      validatedData
    );
    const demande = this.validate(demandeTransportSchema, response.data);
    return { data: demande, status: response.status };
  }

  // Méthodes configuration
  async getConfiguration(etablissementId: string): Promise<ApiResponse<Configuration>> {
    const response = await this.api.get(`${this.baseUrl}/${etablissementId}/configuration`);
    const configuration = this.validate(configurationSchema, response.data);
    return { data: configuration, status: response.status };
  }

  async createConfiguration(etablissementId: string, data: CreateConfigurationDTO): Promise<ApiResponse<Configuration>> {
    const validatedData = this.validate(createConfigurationSchema, data);
    const response = await this.api.post(`${this.baseUrl}/${etablissementId}/configuration`, validatedData);
    const configuration = this.validate(configurationSchema, response.data);
    return { data: configuration, status: response.status };
  }

  async updateConfiguration(etablissementId: string, data: UpdateConfigurationDTO): Promise<ApiResponse<Configuration>> {
    const validatedData = this.validate(updateConfigurationSchema, data);
    const response = await this.api.put(`${this.baseUrl}/${etablissementId}/configuration`, validatedData);
    const configuration = this.validate(configurationSchema, response.data);
    return { data: configuration, status: response.status };
  }

  // Méthodes messages
  async getMessages(etablissementId: string): Promise<ApiResponse<Message[]>> {
    const response = await this.api.get(`${this.baseUrl}/${etablissementId}/messages`);
    const messages = this.validate(z.array(messageSchema), response.data);
    return { data: messages, status: response.status };
  }

  async getDemandeMessages(etablissementId: string, demandeId: string): Promise<ApiResponse<Message[]>> {
    const response = await this.api.get(
      `${this.baseUrl}/${etablissementId}/demandes/${demandeId}/messages`
    );
    const messages = this.validate(z.array(messageSchema), response.data);
    return { data: messages, status: response.status };
  }

  async createMessage(etablissementId: string, data: CreateMessageDTO): Promise<ApiResponse<Message>> {
    const validatedData = this.validate(createMessageSchema, data);
    const response = await this.api.post(`${this.baseUrl}/${etablissementId}/messages`, validatedData);
    const message = this.validate(messageSchema, response.data);
    return { data: message, status: response.status };
  }
} 