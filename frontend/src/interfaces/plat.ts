/** @format */

export interface Plat {
  plat_id: number;
  nom_plat: string;
  type_plat: string;
  photo: string;
}

export const DishType = ["Entrée", "Plat", "Dessert"] as const;

export type DishType = (typeof DishType)[number];
