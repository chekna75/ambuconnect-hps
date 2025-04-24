import { useState, useEffect } from 'react';

export interface Transport {
  id: string;
  patientInfo: string;
  pickupTime: string;
  destination: string;
  status: 'Confirmé' | 'En attente' | 'Annulé';
  assignedCompany?: string;
}

// Données de test pour le développement
const mockTransports: Transport[] = [
  {
    id: '1',
    patientInfo: 'Jean Dupont',
    pickupTime: '2025-04-22T10:00:00',
    destination: 'Service de Radiologie',
    status: 'Confirmé',
    assignedCompany: 'Alpha Ambulance'
  },
  {
    id: '2',
    patientInfo: 'Marie Martin',
    pickupTime: '2025-04-23T14:30:00',
    destination: 'Clinique de Cardiologie',
    status: 'En attente'
  },
  {
    id: '3',
    patientInfo: 'Pierre Dubois',
    pickupTime: '2025-04-24T09:00:00',
    destination: 'Centre de Rééducation',
    status: 'Confirmé',
    assignedCompany: 'Beta Transport'
  }
];

export function useTransportData() {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Pour l'instant, on utilise les données de test
        // TODO: Remplacer par un appel API réel
        setTransports(mockTransports);
        setIsLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des transports');
        setIsLoading(false);
      }
    };

    fetchTransports();
  }, []);

  return { transports, isLoading, error };
}

// Fonction pour ajouter un nouveau transport
export async function addTransport(transport: Omit<Transport, 'id'>) {
  // TODO: Implémenter l'appel API réel
  const newTransport: Transport = {
    ...transport,
    id: Math.random().toString(36).substr(2, 9)
  };
  
  return newTransport;
}

// Fonction pour mettre à jour un transport
export async function updateTransport(id: string, updates: Partial<Transport>) {
  // TODO: Implémenter l'appel API réel
  return { id, ...updates };
}

// Fonction pour supprimer un transport
export async function deleteTransport(id: string) {
  // TODO: Implémenter l'appel API réel
  return true;
} 