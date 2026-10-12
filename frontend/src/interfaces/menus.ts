/** @format */

export interface menusInt {
  menu_id:number;
  menu_titre: string;
  nombre_personne_minimum: number;
  prix_par_personne: number;
  description: string;
  quantite_restante: number;
  regime_nom: string;
  theme_nom: string;
  liste_plats: Array<string[]>;
}
