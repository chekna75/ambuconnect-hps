import { z } from 'zod';
import { BaseService, ApiResponse } from '../base/BaseService';

// Schémas de validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const tokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number()
});

// Types
export type LoginCredentials = z.infer<typeof loginSchema>;
export type TokenResponse = z.infer<typeof tokenSchema>;

export class AuthService extends BaseService {
  private static instance: AuthService;
  private refreshTokenTimeout?: NodeJS.Timeout;

  private constructor() {
    super();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<TokenResponse>> {
    // Valider les données d'entrée
    this.validate(loginSchema, credentials);

    const response = await this.api.post<TokenResponse>('/auth/login', credentials);
    const tokens = this.validate(tokenSchema, response.data);

    // Sauvegarder les tokens
    this.setTokens(tokens);

    return {
      data: tokens,
      status: response.status
    };
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  async refreshToken(): Promise<void> {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await this.api.post<TokenResponse>('/auth/refresh', {
        refresh_token
      });
      const tokens = this.validate(tokenSchema, response.data);
      this.setTokens(tokens);
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  private setTokens(tokens: TokenResponse): void {
    localStorage.setItem('token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);

    // Configurer le rafraîchissement automatique
    this.setupRefreshTokenTimer(tokens.expires_in);
  }

  private clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  private setupRefreshTokenTimer(expiresIn: number): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }

    // Rafraîchir le token 1 minute avant l'expiration
    const timeout = (expiresIn - 60) * 1000;
    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().catch(console.error);
    }, timeout);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
} 