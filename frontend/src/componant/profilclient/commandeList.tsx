/** @format */

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { type Commande } from '../../interfaces/commande';
import api from '../../services/api';
import Loading from '../global/loading/Loading';

export default function CommandeList() {
  const { user } = useAuth();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    if (user?.id === null || user === null) {
      alert('Erreur de chargement');
      return;
    } else {
      api
        .get(`api/commande.php?utilisateur=${user.id}`)
        .then((res) => setCommandes(res.data))
        .catch((err) =>
          console.error('Erreure de chargement des commandes', err),
        );
    }

    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      Liste des commandes
      {commandes.map((commande) => {
        return <p>{commande.commande_ref}</p>;
      })}
    </div>
  );
}
