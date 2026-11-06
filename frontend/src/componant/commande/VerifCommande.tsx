/** @format */

import type { Commande } from '../../interfaces/commande';
import type { MenuDetail } from '../../interfaces/menus';
import calculPrix from '../../utils/calcul_prix_commande';

/** @format */
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

  return (
    <div className="flex flex-col gap-4">
      {/* Mettre les sections en forme de tableau dans un composant */}
      <section className="">
        <h2 className="text-center text-xl font-bold text-green-600 mb-4 ">
          Récapitulatif de la commande
        </h2>

        <p>
          Commande pour le : {commande.commande_presta.prestation_date} à{' '}
          {commande.commande_presta.prestation_heure}{' '}
        </p>
        <p>
          A l'adresse : {adresseData.numero_rue}, {adresseData.street}{' '}
          {adresseData.code_postal} {adresseData.ville}
        </p>
        <p>
          Vous avez commandé {commande.nombre_personne} pars pour le menu{' '}
          {menuData.menu_nom}
        </p>

        {/* à améliorer en supprimant les doublons éventuels avec un set*/}

        {menuData.plats_details.length !== 0 && (
          <div>
            <p>Nous vous rappelons la présénce des alergènes : </p>
            {menuData.plats_details.map(
              (plat, index) =>
                plat.alergenes.length > 0 && (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-800 rounded-full border border-amber-200"
                  >
                    {plat.alergenes.join(', ')}
                  </span>
                ),
            )}
          </div>
        )}
      </section>
      <table className="w-full border-2">
        <caption>Le tarif</caption>
        <thead className="border-2">
          <tr>
            <th>Catégorie</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody className="border-2">
          <tr>
            <th>Total du coût menu</th>
            <td className="text-center">{totalMenu} €</td>
          </tr>
          <tr>
            <th>Frais de transport</th>
            <td className="text-center">{coutLivraison} €</td>
          </tr>
          {nbPars >= menuData.nb_perso_min + 5 && (
            <tr>
              <th>Remise 10%</th>
              <td className="text-center">Accordée</td>
            </tr>
          )}
          <tr>
            <th className="text-2xl">Total de la commande</th>
            <td className="text-center text-2xl font-extrabold text-red-400">
              {' '}
              {totalCommande} €
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
