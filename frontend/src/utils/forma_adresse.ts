/** @format */

import type { adressePostale } from '../interfaces/utilisateur';

export function formatAdresse(adresse: adressePostale) {
  return `${adresse.numero_rue} ${adresse.street}, ${adresse.code_postal} ${adresse.ville}`;
}
