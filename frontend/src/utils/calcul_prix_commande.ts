/** @format */

interface calculePrixInt {
  nbParts: number;
  nbPersonnemin: number;
  fraisLivraison: number;
  totalMenu: number;
}

export default function calculPrix({
  nbParts,
  fraisLivraison,
  nbPersonnemin,
  totalMenu,
}: calculePrixInt): number {
  let prixTotal = 0;
  prixTotal = totalMenu + fraisLivraison;

  if (nbParts >= nbPersonnemin + 5) {
    prixTotal = prixTotal * 0.9;
  }
  return parseFloat(prixTotal.toFixed(2));
}
