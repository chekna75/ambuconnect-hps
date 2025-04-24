import { API_BASE_URL } from '@/constants/api';

interface RequestOptions extends RequestInit {
  token?: string;
  params?: Record<string, any>;
}

export class HttpClient {
  private static instance: HttpClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = API_BASE_URL;
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.log('Status de la réponse:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Erreur détaillée:', errorData);
      
      if (response.status === 403) {
        throw new Error('Non autorisé : Veuillez vous reconnecter');
      }
      
      throw new Error(errorData?.message || `Erreur ${response.status}`);
    }

    return response.json();
  }

  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, params, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(token),
      ...restOptions,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const { token, params, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
      ...restOptions,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const { token, params, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
      ...restOptions,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, params, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(token),
      ...restOptions,
    });

    return this.handleResponse<T>(response);
  }
} 