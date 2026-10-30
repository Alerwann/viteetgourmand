/** @format */

export interface PlatDetail {
  plat_id: number;
  nom: string;
  type_plat: string;
  photo: string;
  alergenes: string[];
}

export interface MenusInt {
  menu_id?: number;
  menu_nom: string;
  nb_perso_min: number;
  menu_prix: number;
  description: string;
  quantite_restante: number;
  regime_id: number;
  theme_id: number;
  note_particuliere?: string;
}

export interface MenuDetail {
  menu_id?: number;
  menu_nom: string;
  nb_perso_min: number;
  menu_prix: number;
  description: string;
  quantite_restante: number;
  regime_nom: string;
  theme_nom: string;
  note_particuliere?: string;
  plats_details: PlatDetail[];
}
