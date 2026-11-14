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
  'validée': string;
  'acceptée': string;
  'en preparation': string;
  'en cours de livraison': string;
  'livrée': string;
  'en attente de retour de matériel': string;
  'terminée': string;
}

export const statusCommande = [
  'validée',
  'acceptée',
  'en preparation',
  'en cours de livraison',
  'livrée',
  'en attente de retour de matériel',
  'terminée',
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

export function initCommande(
  nb_perso_min?: number,
  menu_id?: number,
  utilisateur_id?: number,
): Commande {
  return {
    commande_ref: '',
    commande_date: new Date().toISOString(),
    nombre_personne: nb_perso_min ?? 0,
    menu_id: menu_id ?? -1,
    utilisateur_id: utilisateur_id ?? -1,
    commande_presta: {
      prestation_date: '',
      prestation_heure: '',
      prestation_adresse: {
        numero_rue: 0,
        street: '',
        ville: '',
        code_postal: 0,
        pays: 'France',
      },
      livraison_prix: 0,
      pret_materiel: false,
      restitution_materiel: false,
    },
    commande_status: 'acceptée',
  };
}

export interface GetCommande {
  commande_id?: number;
  commande_ref: string;
  commande_date: string;
  nombre_personne: number;
  menu_id: number;
  utilisateur_id: number;
  commande_presta: CommandePresta;
  commande_status: statusCommande;
  utilisateur_nom: string;
  utilisateur_prenom: string;
  menu_nom: string;
}

export function initGetCommande(): GetCommande {
  return {
    commande_ref: '',
    commande_date: new Date().toISOString(),
    nombre_personne: 0,
    menu_id: 0,
    menu_nom: '',
    utilisateur_id: -1,
    utilisateur_nom: '',
    utilisateur_prenom: '',
    commande_presta: {
      prestation_date: '',
      prestation_heure: '',
      prestation_adresse: {
        numero_rue: 5,
        street: '',
        ville: '',
        code_postal: 0,
        pays: 'France',
      },
      livraison_prix: 0,
      pret_materiel: false,
      restitution_materiel: false,
    },
    commande_status: 'acceptée',
  };
}
