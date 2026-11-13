/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initGetCommande, type GetCommande } from '../../interfaces/commande';
import api from '../../services/api';
import Loading from '../global/loading/Loading';

export default function ModifCommande() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commande, setCommande] = useState<GetCommande>(initGetCommande);

  useEffect(() => {
    api
      .get(`api/commande.php?id=${id}`)
      .then((res) => setCommande(res.data))
      .catch((err) => console.error('Erreur chargement :', err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return <div>Commande à modifier id: {commande.commande_ref}</div>;
}
