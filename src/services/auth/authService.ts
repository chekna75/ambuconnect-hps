import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://ambuconnect-api-recette.up.railway.app';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    etablissementId: string;
  };
  token: string;
}

export interface UtilisateurEtablissementDto {
  id?: string;  // Optionnel lors de la création
  etablissementId: string;
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  telephone: string;
  role: string; // Vous pouvez définir un enum pour RoleUtilisateur selon votre besoin
  actif: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Identifiants invalides');
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la déconnexion');
      }
      throw error;
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-token`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors du rafraîchissement du token');
      }
      throw error;
    }
  },

  
}; 