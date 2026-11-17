/** @format */

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { type GetCommande } from '../../interfaces/commande';
import api from '../../services/api';
import Loading from '../global/loading/Loading';
import TitleCommandeSection from '../global/styles/title_commande_section';
import { saveCommande } from '../../services/commande_service';

const thStyle = 'border-2 px-10 py-8';

export default function CommandeList() {
  const { user } = useAuth();
  const [commandes, setCommandes] = useState<GetCommande[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    if (user?.id === null || user === null) {
      alert('Erreur de chargement');
      return;
    } else {
      api
        .get(`api/commande.php?utilisateur=${user.id}`)
        .then((res) => {
          setCommandes(res.data);
        })
        .catch((err) =>
          console.error('Erreure de chargement des commandes', err),
        );
    }

    setLoading(false);
  }, []);

  const [selectedCommande, setSelectedCommande] = useState<GetCommande | null>(
    null,
  );

  const handleConfirmCancel = async () => {
    if (!selectedCommande) return;

    try {
      await saveCommande(
        setLoading,
        selectedCommande,
        {
          modif_contact: 'client',
          modif_description: 'Annulation par le client',
        },
        true,
      );
    } catch (err) {
      console.error("Erreur lors de l'annulation de la commande", err);
    } finally {
      setSelectedCommande(null);
    }
  };

  console.log(commandes.length);
  if (loading) return <Loading />;

  return (
    <div className=" bg-white p-8 rounded-2xl shadow-sm  px-6 py-12 border border-[#EFECE6] justify-center">
      <table className="border-collapse border-4 border-black p-4 text-center">
        <caption className="mb-8">
          <TitleCommandeSection title="Liste des commandes" />
        </caption>
        <thead>
          <tr>
            <th className={thStyle}>Référence</th>
            <th className={thStyle}>Date de commande</th>
            <th className={thStyle}>Date de livraison</th>
            <th className={thStyle}>Status</th>
            <th className={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.commande_ref}>
              <td className={thStyle}>{commande.commande_ref}</td>
              <td className={thStyle}>{commande.commande_date}</td>
              <td className={thStyle}>
                {commande.commande_presta.prestation_date}
              </td>
              <td className={thStyle}>{commande.commande_status}</td>
              <td className={thStyle}>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors  disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                  disabled={commande.commande_status != 'validée'}
                  type="button"
                  onClick={() => setSelectedCommande(commande)}
                >
                  Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCommande && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <p className="mb-6 text-center font-medium">
              Êtes-vous sûr de vouloir annuler la commande ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setSelectedCommande(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Non
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
