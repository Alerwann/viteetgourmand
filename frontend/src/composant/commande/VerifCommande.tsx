/** @format */

import type { Commande } from '../../interfaces/commande';
import type { MenuDetail } from '../../interfaces/menus';

/** @format */
interface verifCommandeInt {
  commande: Commande;
  menuData: MenuDetail;
}
export default function VerifCommande({
  commande,
  menuData,
}: verifCommandeInt) {
  const adresseData = commande.commande_presta.prestation_adresse;

  return (
    <div>
      <h2>Récapitulatif de la commande</h2>
      <p>
        Commande pour le : {commande.commande_presta.prestation_date} à{' '}
        {commande.commande_presta.prestation_heure}{' '}
      </p>
      <p>
        A l'adresse : {adresseData.numero_rue}, {adresseData.street} <br></br>
        {adresseData.code_postal} {adresseData.ville}
      </p>
      <p>
        Vous avez commandé {commande.nombre_personne} pars pour le menu{' '}
        {menuData.menu_nom}
      </p>

      {/* à améliorer en supprimant les doublons éventuels */}

      {menuData.plats_details.length !== 0 && (
        <div>
          <p>Nous vous rappelons la présénce des alergènes : </p>
          {menuData.plats_details.map(
            (plat) =>
              plat.alergenes.length > 0 && (
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  {plat.alergenes.join(', ')}
                </span>
              ),
          )}
        </div>
      )}
    </div>
  );
}
