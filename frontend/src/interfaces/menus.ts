/** @format */

export interface PlatDetail {
  plat_id: number;
  nom: string;
  type_plat: string;
  photo: string;
  alergenes: string[];
}

export interface menusInt {
  menu_id: number;
  menu_titre: string;
  nombre_personne_minimum: number;
  prix_par_personne: number;
  description: string;
  quantite_restante: number;
  nom_regime: string;
  theme_nom: string;
  note_particuliere?: string;
  plats_details: PlatDetail[];
}
