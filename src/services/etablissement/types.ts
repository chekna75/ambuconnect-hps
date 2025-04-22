import { z } from 'zod';

// Types d'établissement
export const typeEtablissementEnum = z.enum([
  'HOPITAL',
  'CLINIQUE',
  'EHPAD',
  'CABINET_MEDICAL',
  'CENTRE_REEDUCATION'
]);

// Types de transport
export const typeTransportEnum = z.enum([
  'ASSIS',
  'COUCHE',
  'MEDICALISE',
  'BARIATRIQUE'
]);

// Rôles utilisateur
export const roleUtilisateurEnum = z.enum([
  'ADMIN',
  'RESPONSABLE',
  'OPERATEUR',
  'REGULATEUR'
]);

// Schémas de validation
export const etablissementSchema = z.object({
  id: z.string().uuid(),
  nom: z.string().min(2),
  typeEtablissement: typeEtablissementEnum,
  adresse: z.string(),
  ville: z.string(),
  codePostal: z.string().regex(/^\d{5}$/),
  emailContact: z.string().email(),
  telephoneContact: z.string().regex(/^0[1-9]\d{8}$/),
  responsableReferentId: z.string().uuid(),
  siret: z.string().regex(/^\d{14}$/),
  actif: z.boolean(),
  dateCreation: z.string().datetime(),
  dateModification: z.string().datetime().optional()
});

export const createEtablissementSchema = z.object({
  nom: z.string().min(2),
  typeEtablissement: typeEtablissementEnum,
  adresse: z.string(),
  emailContact: z.string().email(),
  telephoneContact: z.string().regex(/^0[1-9]\d{8}$/),
  responsableReferentId: z.string().uuid()
});

export const updateEtablissementSchema = createEtablissementSchema.partial();

export const statsParamsSchema = z.object({
  debut: z.string().datetime(),
  fin: z.string().datetime()
});

export const statsSchema = z.object({
  nombreTransports: z.number(),
  nombrePatientsUniques: z.number(),
  tauxSatisfaction: z.number(),
  tempsAttenteMoyen: z.number()
});

// Types dérivés des schémas
export type TypeEtablissement = z.infer<typeof typeEtablissementEnum>;
export type TypeTransport = z.infer<typeof typeTransportEnum>;
export type RoleUtilisateur = z.infer<typeof roleUtilisateurEnum>;
export type Etablissement = z.infer<typeof etablissementSchema>;
export type CreateEtablissementDTO = z.infer<typeof createEtablissementSchema>;
export type UpdateEtablissementDTO = z.infer<typeof updateEtablissementSchema>;
export type StatsParams = z.infer<typeof statsParamsSchema>;
export type EtablissementStats = z.infer<typeof statsSchema>;

// Schéma utilisateur
export const utilisateurSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  role: roleUtilisateurEnum,
  telephone: z.string().regex(/^0[1-9]\d{8}$/),
  etablissementId: z.string().uuid(),
  actif: z.boolean(),
  dateCreation: z.string().datetime(),
  dateModification: z.string().datetime().optional()
});

export const createUtilisateurSchema = z.object({
  email: z.string().email(),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  role: roleUtilisateurEnum,
  telephone: z.string().regex(/^0[1-9]\d{8}$/),
  motDePasse: z.string().min(8)
});

// Types utilisateur
export type Utilisateur = z.infer<typeof utilisateurSchema>;
export type CreateUtilisateurDTO = z.infer<typeof createUtilisateurSchema>;

// Schéma demande de transport
export const statutDemandeEnum = z.enum([
  'EN_ATTENTE',
  'ACCEPTEE',
  'EN_COURS',
  'TERMINEE',
  'ANNULEE'
]);

export const demandeTransportSchema = z.object({
  id: z.string().uuid(),
  etablissementId: z.string().uuid(),
  patientId: z.string().uuid(),
  adresseDepart: z.string(),
  adresseArrivee: z.string(),
  horaireSouhaite: z.string().datetime(),
  typeTransport: typeTransportEnum,
  statut: statutDemandeEnum,
  commentaire: z.string().optional(),
  dateCreation: z.string().datetime(),
  dateModification: z.string().datetime().optional()
});

export const createDemandeTransportSchema = z.object({
  patientId: z.string().uuid(),
  adresseDepart: z.string(),
  adresseArrivee: z.string(),
  horaireSouhaite: z.string().datetime(),
  typeTransport: typeTransportEnum,
  commentaire: z.string().optional()
});

export const updateDemandeStatusSchema = z.object({
  statut: statutDemandeEnum
});

export const filtreDemandesSchema = z.object({
  status: statutDemandeEnum.optional(),
  debut: z.string().datetime().optional(),
  fin: z.string().datetime().optional()
});

// Types dérivés des schémas
export type StatutDemande = z.infer<typeof statutDemandeEnum>;
export type DemandeTransport = z.infer<typeof demandeTransportSchema>;
export type CreateDemandeTransportDTO = z.infer<typeof createDemandeTransportSchema>;
export type UpdateDemandeStatusDTO = z.infer<typeof updateDemandeStatusSchema>;
export type FiltresDemandes = z.infer<typeof filtreDemandesSchema>;

// Schéma configuration établissement
export const configurationSchema = z.object({
  id: z.string().uuid(),
  etablissementId: z.string().uuid(),
  heuresOuverture: z.object({
    lundi: z.array(z.string()),
    mardi: z.array(z.string()),
    mercredi: z.array(z.string()),
    jeudi: z.array(z.string()),
    vendredi: z.array(z.string()),
    samedi: z.array(z.string()).optional(),
    dimanche: z.array(z.string()).optional()
  }),
  delaiMinAvantTransport: z.number().min(0),
  delaiMaxAvantTransport: z.number().min(0),
  notificationParEmail: z.boolean(),
  notificationParSMS: z.boolean(),
  dateCreation: z.string().datetime(),
  dateModification: z.string().datetime().optional()
});

export const createConfigurationSchema = configurationSchema
  .omit({ 
    id: true, 
    etablissementId: true, 
    dateCreation: true, 
    dateModification: true 
  });

export const updateConfigurationSchema = createConfigurationSchema.partial();

// Types dérivés des schémas
export type Configuration = z.infer<typeof configurationSchema>;
export type CreateConfigurationDTO = z.infer<typeof createConfigurationSchema>;
export type UpdateConfigurationDTO = z.infer<typeof updateConfigurationSchema>;

// Schéma message
export const messageTypeEnum = z.enum([
  'NOTIFICATION',
  'INFORMATION',
  'URGENT',
  'DISCUSSION'
]);

export const messageSchema = z.object({
  id: z.string().uuid(),
  etablissementId: z.string().uuid(),
  demandeId: z.string().uuid().optional(),
  expediteurId: z.string().uuid(),
  expediteurNom: z.string(),
  expediteurRole: z.string(),
  type: messageTypeEnum,
  contenu: z.string(),
  lu: z.boolean(),
  dateCreation: z.string().datetime(),
  dateModification: z.string().datetime().optional()
});

export const createMessageSchema = z.object({
  demandeId: z.string().uuid().optional(),
  type: messageTypeEnum,
  contenu: z.string().min(1)
});

// Types dérivés des schémas
export type MessageType = z.infer<typeof messageTypeEnum>;
export type Message = z.infer<typeof messageSchema>;
export type CreateMessageDTO = z.infer<typeof createMessageSchema>; 