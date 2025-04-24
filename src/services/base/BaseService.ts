import axios, { AxiosInstance, AxiosError } from 'axios';
import { z } from 'zod';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export abstract class BaseService {
  protected readonly api: AxiosInstance;
  
  constructor(baseURL: string = 'https://ambuconnect-api-recette.up.railway.app') {
    this.api = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      this.handleError
    );
  }

  protected async handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      const status = error.response.status;
      const message = (error.response.data as any)?.message || error.message;
      
      // Gérer les erreurs d'authentification
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      throw new ApiError(message, status);
    }

    if (error.request) {
      throw new ApiError('Erreur de connexion au serveur', 503);
    }

    throw new ApiError('Une erreur inattendue est survenue', 500);
  }

  protected validate<T>(schema: z.ZodType<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError('Données invalides', 400, 'VALIDATION_ERROR');
      }
      throw error;
    }
  }
} 