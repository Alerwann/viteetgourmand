/** @format */

import type { Commande } from '../../interfaces/commande';
import type { MenuDetail } from '../../interfaces/menus';
import calculPrix from '../../utils/calcul_prix_commande';

interface verifCommandeInt {
  commande: Commande;
  menuData: MenuDetail;
  coutLivraison: number;
}

export default function VerifCommande({
  commande,
  menuData,
  coutLivraison,
}: verifCommandeInt) {
  const adresseData = commande.commande_presta.prestation_adresse;
  const menuPrix = menuData.menu_prix;
  const nbPars = commande.nombre_personne;
  const totalMenu = menuPrix * nbPars;

  const totalCommande = calculPrix({
    nbParts: nbPars,
    nbPersonnemin: menuData.nb_perso_min,
    fraisLivraison: coutLivraison,
  });

  // Extraction unique des allergènes pour éviter les doublons avec un Set
  const allAllergens = Array.from(
    new Set(menuData.plats_details?.flatMap((plat) => plat.alergenes) || []),
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 py-8 px-4 font-sans text-[#2C2C2C]">
      {/* Carte Récapitulatif de la commande */}
      <section className="bg-white p-8 rounded-2xl border border-[#EFECE6] shadow-sm space-y-6">
        <h2 className="text-center text-2xl font-serif font-bold text-[#2C2C2C] mb-2">
          Récapitulatif de la commande
        </h2>
        <div className="w-12 h-1 bg-[#D95D39] mx-auto rounded-full mb-6"></div>

        <div className="space-y-3 text-[#555555] text-base">
          <p className="flex items-center gap-2">
            <span className="font-semibold text-[#2C2C2C]">
              📅 Date & Heure :
            </span>{' '}
            {commande.commande_presta.prestation_date} à{' '}
            {commande.commande_presta.prestation_heure}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-[#2C2C2C]">📍 Adresse :</span>{' '}
            {adresseData.numero_rue}, {adresseData.street}{' '}
            {adresseData.code_postal} {adresseData.ville}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-[#2C2C2C]">🍽️ Formule :</span>{' '}
            {commande.nombre_personne} parts commandées pour le menu{' '}
            <strong className="text-[#2C2C2C]">{menuData.menu_nom}</strong>
          </p>
        </div>

        {/* Gestion propre des allergènes uniques avec un Set */}
        {allAllergens.length > 0 && (
          <div className="mt-4 p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
            <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2">
              ⚠️ Rappel des allergènes présents dans ce menu :
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allAllergens.map((allergene, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white text-amber-800 rounded-full border border-amber-200 shadow-2xs"
                >
                  {allergene}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Tableau des tarifs moderne */}
      <div className="bg-white rounded-2xl border border-[#EFECE6] shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Le tarif détaillé de la commande
          </caption>
          <thead className="bg-[#FDFBF7] border-b border-[#EFECE6]">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold text-[#888888] uppercase tracking-wider">
                Catégorie
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-[#888888] uppercase tracking-wider text-right">
                Montant
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE6] text-[#2C2C2C]">
            <tr>
              <th className="py-4 px-6 font-normal">Total du coût menu</th>
              <td className="py-4 px-6 text-right font-medium">
                {totalMenu} €
              </td>
            </tr>
            <tr>
              <th className="py-4 px-6 font-normal">Frais de transport</th>
              <td className="py-4 px-6 text-right font-medium">
                {coutLivraison} €
              </td>
            </tr>
            {nbPars >= menuData.nb_perso_min + 5 && (
              <tr className="bg-emerald-50/40">
                <th className="py-4 px-6 font-normal text-emerald-800">
                  Remise 10% appliquée
                </th>
                <td className="py-4 px-6 text-right font-semibold text-emerald-700">
                  Accordée
                </td>
              </tr>
            )}
            <tr className="bg-[#FDFBF7] font-serif">
              <th className="py-5 px-6 text-xl font-bold text-[#2C2C2C]">
                Total de la commande
              </th>
              <td className="py-5 px-6 text-right text-2xl font-extrabold text-[#D95D39]">
                {totalCommande} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
