/** @format */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { type GetCommande, statusCommande } from '../../interfaces/commande';
import Loading from '../global/loading/Loading';
import TitleCommandeSection from '../global/styles/title_commande_section';

const thStyle = 'border-2 px-10 py-8';
const ITEMS_PER_PAGE = 15;

export default function GestionCommande() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commandes, setCommandes] = useState<GetCommande[]>([]);

  const [statusFilter, setStatusFilter] = useState<string>('');
  const [clientSearch, setClientSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('api/commande.php')
      .then((res) => setCommandes(res.data))
      .catch((err) => console.error('Erreur chargement :', err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCommandes = useMemo(() => {
    return commandes.filter((commande) => {
      const matchStatus = statusFilter
        ? commande.commande_status === statusFilter
        : true;

      const search = clientSearch.toLowerCase();
      const matchClient = search
        ? commande.commande_ref.toLowerCase().includes(search) ||
          (commande.utilisateur_nom &&
            commande.utilisateur_nom.toLowerCase().includes(search))
        : true;

      return matchStatus && matchClient;
    });
  }, [commandes, statusFilter, clientSearch]);

  const totalPages = Math.ceil(filteredCommandes.length / ITEMS_PER_PAGE);
  const paginatedCommandes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCommandes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCommandes, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, clientSearch]);

  if (isLoading) return <Loading />;

  return (
    <div className="m-8 flex flex-col content-center items-center">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Rechercher (client, réf...)"
          value={clientSearch}
          onChange={(e) => setClientSearch(e.target.value)}
          className="border-2 p-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-2 p-2 rounded capitalize"
        >
          <option value="">Tous les statuts</option>
          {statusCommande.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <table className="border-collapse border-4 p-4 text-center">
        <caption className="mb-8">
          <TitleCommandeSection title="Liste des commandes" />
        </caption>
        <thead>
          <tr>
            <th className={thStyle}>Référence</th>
            <th className={thStyle}>Date de commande</th>
            <th className={thStyle}>Date de livraison</th>
            <th className={thStyle}>Identité</th>
            <th className={thStyle}>Status</th>
            <th className={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCommandes.map((commande) => (
            <tr key={commande.commande_ref}>
              <td className={thStyle}>{commande.commande_ref}</td>
              <td className={thStyle}>{commande.commande_date}</td>
              <td className={thStyle}>
                {commande.commande_presta.prestation_date}
              </td>
              <td className={thStyle}>
                {commande.utilisateur_nom} {commande.utilisateur_prenom}
              </td>
              <td className={thStyle}>{commande.commande_status}</td>
              <td className={thStyle}>
                <Link
                  to={`/Commandes/${commande.commande_id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Modifier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex gap-4 items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="border px-4 py-2 disabled:opacity-50"
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="border px-4 py-2 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
