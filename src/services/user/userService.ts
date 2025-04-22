import { BaseService, ApiResponse } from '../base/BaseService';
import { z } from 'zod';

// Types
interface CreateUserDTO {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  role: 'admin' | 'user' | 'manager';
  etablissementId: string;
}

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  etablissementId: string;
  dateCreation: string;
  dateModification?: string;
}

class UserService extends BaseService {
  private static instance: UserService;
  private readonly baseUrl = '/users';

  private constructor() {
    super();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async createUser(data: CreateUserDTO): Promise<ApiResponse<User>> {
    const response = await this.api.post<User>(this.baseUrl, data);
    return {
      data: response.data,
      status: response.status
    };
  }

  async updateUser(userId: string, data: Partial<CreateUserDTO>): Promise<ApiResponse<User>> {
    const response = await this.api.patch<User>(`${this.baseUrl}/${userId}`, data);
    return {
      data: response.data,
      status: response.status
    };
  }

  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`${this.baseUrl}/${userId}`);
    return {
      data: undefined,
      status: response.status
    };
  }
}

export const userService = UserService.getInstance();
export default userService; 