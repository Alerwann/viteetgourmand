/** @format */

import type { CommandeModifications } from '../../interfaces/commandeModif';
import formatDate from '../../utils/trad_date';
import TitleCommandeSection from '../global/styles/title_commande_section';

const thStyle = 'border-2 px-10 py-8';
export default function TableModifCommande(
  modifCommande: CommandeModifications,
) {
  return (
    <div>
      <table className="border-collapse border-4 border-black p-4 text-center w-full justify-center">
        <caption className="mb-8">
          <TitleCommandeSection title="Liste des Modifications" />
        </caption>
        <thead>
          <tr>
            <th className={thStyle}>Date de modification</th>

            <th className={thStyle}>Description</th>
            <th className={thStyle}>Moyen de contact</th>
          </tr>
        </thead>
        <tbody>
          {modifCommande.modif.map((commande) => (
            <tr key={commande.modif_description}>
              <td className={thStyle}>{formatDate(commande.modif_date)}</td>

              <td className={thStyle}>{commande.modif_description}</td>
              <td className={thStyle}>
                {commande.modif_contact.charAt(0).toUpperCase() +
                  commande.modif_contact.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
