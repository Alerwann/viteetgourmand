/** @format */

export interface Plat {
  plat_id: number;
  plat_nom: string;
  type_plat: string;
  photo: string;
}

export const DishType = ["Entrée", "Plat", "Dessert"] as const;

export type DishType = (typeof DishType)[number];
