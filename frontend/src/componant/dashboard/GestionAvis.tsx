/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { StatusAvis, type Avis } from '../../interfaces/avis';
import Loading from '../global/loading/Loading';
import TitleCommandeSection from '../global/styles/title_commande_section';
import formatDate from '../../utils/trad_date';

const ITEMS_PER_PAGE = 15;
const thStyle = 'border-2 px-10 py-8';
export default function GestionAvis() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  //   const [clientSearch, setClientSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [avis, SetAvis] = useState<Avis[]>([]);

  useEffect(() => {
    setIsLoading(true);
    api
      .get('api/avis.php')
      .then((res) => SetAvis(res.data))
      .catch((err) => console.error('Erreur chargement :', err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCommandes = useMemo(() => {
    return avis.filter((avis) => {
      const matchStatus = statusFilter ? avis.status === statusFilter : true;

      return matchStatus;
    });
  }, [avis, statusFilter]);
  const totalPages = Math.ceil(filteredCommandes.length / ITEMS_PER_PAGE);
  const paginatedCommandes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCommandes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCommandes, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handleClick = (e: React.SubmitEvent) => {
    e.preventDefault();
    const avisId = Number(e.target.id);
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    api.post(`api/avis.php?avisId=${avisId}&status=${submitter.name}`);
  };

  if (isLoading) return <Loading />;
  return (
    <div className="m-8 flex flex-col content-center items-center">
      <div className="mb-6 flex gap-4">
        <label htmlFor="selectavis">Sélectionner les status d'avis</label>
        <select
          id="selectavis"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-2 p-2 rounded capitalize"
        >
          <option value="">Tous les statuts</option>
          {StatusAvis.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <table className="border-collapse border-4 p-4 text-center">
        <caption className="mb-8">
          <TitleCommandeSection
            title="
            Liste de avis"
          />
        </caption>
        <thead>
          <tr>
            <th className={thStyle}>Ref-commande</th>
            <th className={thStyle}>Date de création</th>
            <th className={thStyle}>Status</th>
            <th className={thStyle}>Description</th>
            <th className={thStyle}>Note</th>
            <th className={thStyle}>Valider l'avis</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCommandes.map((avis) => (
            <tr
              key={avis.avis_id}
              className={`${avis.note < 3 ? ' bg-red-100 ' : ' bg-green-100'} `}
            >
              <td className={thStyle}>{avis.commande_ref}</td>
              <td className={thStyle}>
                {avis.created_at
                  ? formatDate(avis.created_at!)
                  : 'Pas de date enregistrée'}
              </td>
              <td className={thStyle}>{avis.status}</td>
              <td className={thStyle}>{avis.description}</td>
              <td className={thStyle}>{avis.note} / 5</td>

              <td className={thStyle} colSpan={2}>
                <form
                  onSubmit={handleClick}
                  id={avis.avis_id.toString()}
                  className="flex gap-2 "
                >
                  <button
                    type="submit"
                    name="publié"
                    disabled={avis.status !== 'créé'}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                  >
                    Publier
                  </button>
                  <button
                    type="submit"
                    name="refusé"
                    disabled={avis.status !== 'créé'}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                  >
                    Refuser
                  </button>
                </form>
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
