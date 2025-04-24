export enum RoleUtilisateur {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}

export interface UtilisateurEtablissementDto {
  id?: string;
  etablissementId: string;
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  telephone?: string;
  role: RoleUtilisateur;
  actif?: boolean;
}

export interface CreateUserResponse {
  data: UtilisateurEtablissementDto;
  status: number;
  message?: string;
} 