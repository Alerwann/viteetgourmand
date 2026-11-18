/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { type CommandeModifications } from '../../interfaces/commandeModif';

export default function SuiviCommande() {
  const { commandeId } = useParams();
  const [commandeModif, setCommandeModif] = useState<CommandeModifications>();

  useEffect(() => {
    api
      .get(`api/commande.php?id=${commandeId}&modif=${true}`)
      .then((res) => setCommandeModif(res.data))
      .catch((err) => console.log('Erreur de chargement', err));
  }, [commandeId]);

  return <div>Suivi de la commande {commandeModif?.commande.commande_id} </div>;
}
