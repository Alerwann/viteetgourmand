/** @format */

import type { adressePostale } from './utilisateur';

export interface CommandePresta {
  prestation_date: string;
  prestation_heure: string;
  prestation_adresse: adressePostale;
  livraison_prix: number;
  pret_materiel: boolean;
  restitution_materiel: boolean;
}
export interface StatusCommande {
  création: string;
  accepte: string;
  preparation: string;
  livraison: string;
  livre: string;
  attenteMateriel: string;
  termine: string;
}

export const statusCommande = [
  'Création',
  'Acceptée',
  'En préparation',
  'En livraison',
  'Livrée',
  'En attente restitution',
  'Terminée',
] as const;

export type statusCommande = (typeof statusCommande)[number];

export interface Commande {
  commande_id?: number;
  commande_ref: string;
  commande_date: string;
  nombre_personne: number;
  menu_id: number;
  utilisateur_id: number;
  commande_presta: CommandePresta;
  commande_status: statusCommande;
}
