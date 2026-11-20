/** @format */

import { type Commande, type ModifCommande } from './commande';

export interface CommandeModifications {
  commande: Commande;
  modif: ModifCommande[];
}
