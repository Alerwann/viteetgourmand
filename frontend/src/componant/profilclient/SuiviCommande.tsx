/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { type CommandeModifications } from '../../interfaces/commandeModif';
import TitleCommandeSection from '../global/styles/title_commande_section';
import TableModifCommande from './TableModifCommande';
import formatDate from '../../utils/trad_date';
import { formatAdresse } from '../../utils/forma_adresse';

const thStyle = 'border-2 px-10 py-8';
export default function SuiviCommande() {
  const { commandeId } = useParams();
  const [commandeModif, setCommandeModif] = useState<CommandeModifications>();

  useEffect(() => {
    api
      .get(`api/commande.php?id=${commandeId}&modif=${true}`)
      .then((res) => setCommandeModif(res.data))
      .catch((err) => console.log('Erreur de chargement', err));
  }, [commandeId]);

  if (!commandeModif) return <div>Erreur de chargement</div>;
  return (
    <div className="mt-8 flex flex-col items-center content-center gap-8 bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      <TitleCommandeSection title={'Résumé du suivi de commande'} />
      <section>
        <p>Statut de la commande : {commandeModif.commande.commande_status}</p>
        <p>
          Date de livraison :{' '}
          {formatDate(commandeModif.commande.commande_presta.prestation_date)}
        </p>
        <p>
          Adresse de livraison :{' '}
          {commandeModif.commande.commande_presta.prestation_adresse &&
            formatAdresse(
              commandeModif.commande.commande_presta.prestation_adresse,
            )}
        </p>
      </section>
      {commandeModif?.modif && (
        <div>
          <section>
            {commandeModif?.modif.length >= 0 && (
              <TableModifCommande
                commande={commandeModif.commande}
                modif={commandeModif.modif}
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
