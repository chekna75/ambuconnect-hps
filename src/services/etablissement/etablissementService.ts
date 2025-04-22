import axios from 'axios';
import { EtablissementFormValues } from '@/pages/CreateEtablissement';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const etablissementService = {
  async createEtablissement(data: EtablissementFormValues) {
    try {
      const response = await axios.post(`${API_URL}/etablissements`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la création de l\'établissement');
      }
      throw error;
    }
  },

  async getEtablissements() {
    try {
      const response = await axios.get(`${API_URL}/etablissements`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des établissements');
      }
      throw error;
    }
  },
}; 