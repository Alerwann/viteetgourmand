/** @format */

import type { alergene } from './alergene';

export interface Plat {
  plat_id?: number;
  plat_nom: string;
  type_plat: string;
  photo: string | File;
}
export const platInit: Plat = {
  plat_id: undefined,
  plat_nom: '',
  type_plat: '',
  photo: '',
};

export interface PlatAlergenes {
  plat_id?: number;
  plat_nom: string;
  type_plat: string;
  photo: string | File;
  alergenes: alergene[];
}

export const PlatAlergenInit: PlatAlergenes = {
  plat_nom: '',
  type_plat: '',
  photo: '',
  alergenes: [],
};
export const DishType = ['Entrée', 'Plat', 'Dessert'] as const;

export type DishType = (typeof DishType)[number];
