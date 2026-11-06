/** @format */

interface calculePrixInt {
  nbParts: number;
  nbPersonnemin: number;
  fraisLivraison: number;
}

export default function calculPrix({
  nbParts,
  fraisLivraison,
  nbPersonnemin,
}: calculePrixInt): number {
  let prixTotal = 0;
  prixTotal = nbParts + fraisLivraison;

  if (nbParts >= nbPersonnemin + 5) {
    prixTotal = prixTotal * 0.9;
  }
  return parseFloat(prixTotal.toFixed(2));
}
