/** @format */

import type { adressePostale } from './utilisateur';

export interface AdresseFormInterface {
  adresse_postale: adressePostale;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
