import { AxiosError } from 'axios';
import { BaseService, ApiResponse } from '../base/BaseService';
import { User } from '../auth/AuthService';
import { UtilisateurEtablissementDto, CreateUserResponse } from './types';

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: string;
  etablissementId?: number;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: string;
  etablissementId?: number;
}

export class UserService extends BaseService {
  private static instance: UserService;

  private constructor() {
    super();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async createUser(
    etablissementId: string,
    userData: Omit<UtilisateurEtablissementDto, 'etablissementId'>
  ): Promise<CreateUserResponse> {
    try {
      const response = await this.api.post<CreateUserResponse>(
        `/etablissements/${etablissementId}/utilisateurs`,
        {
          ...userData,
          etablissementId
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await this.api.get<ApiResponse<User[]>>('/users');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await this.api.get<ApiResponse<User>>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async updateUser(id: number, userData: UpdateUserData): Promise<ApiResponse<User>> {
    try {
      const response = await this.api.put<ApiResponse<User>>(
        `/users/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await this.api.delete<ApiResponse<void>>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
}

export default UserService.getInstance();
