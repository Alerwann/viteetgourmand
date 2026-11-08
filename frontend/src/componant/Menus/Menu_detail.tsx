/** @format */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { MenuDetail } from '../../interfaces/menus';
import CustomButton from '../global/styles/button_global';
import api from '../../services/api';
import Loading from '../global/loading/Loading';

export default function MenuDetail() {
  const { id } = useParams();
  const [dataMenu, setDataMenu] = useState<MenuDetail>();

  useEffect(() => {
    api
      .get(`api/menus.php?id=${id}`)
      .then((res) => setDataMenu(res.data))
      .catch((err) => console.error('Erreur fetch menu:', err));
  }, [id]);

  if (!dataMenu) {
    return <Loading />;
  }

  // Groupement des plats par type_plat
  const platsByType = dataMenu.plats_details?.reduce(
    (acc, plat) => {
      const type = plat.type_plat || 'autres';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(plat);
      return acc;
    },
    {} as Record<string, typeof dataMenu.plats_details>,
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md border border-[#EFECE6] rounded-2xl overflow-hidden flex flex-col items-center gap-4 my-8 pt-6">
      <CustomButton label="Commander" type="button" to={`/commande/${id}`} />

      <p className="text-xs text-[#666666] italic">
        Un compte client est nécessaire pour toute commande
      </p>

      <div className="bg-[#FDFBF7] w-full text-[#2C2C2C] px-8 py-6 border-t border-b border-[#EFECE6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white border border-[#EFECE6] text-[#2C2C2C] rounded-full mb-3 shadow-2xs">
            Thème: {dataMenu.theme_nom}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white border border-[#EFECE6] text-[#2C2C2C] rounded-full mb-3 shadow-2xs">
            Régime: {dataMenu.regime_nom}
          </span>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-[#2C2C2C]">
            {dataMenu.menu_nom}
          </h1>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-[#D95D39]">
            {dataMenu.menu_prix} €
          </div>
          <div className="text-xs text-[#666666]">par personne</div>
        </div>
      </div>

      <div className="p-8 bg-white space-y-8 w-full">
        <div>
          <h2 className="text-sm font-semibold text-[#888888] uppercase tracking-wider mb-2">
            Description
          </h2>
          <p className="text-[#555555] leading-relaxed text-lg font-sans">
            {dataMenu.description}
          </p>
        </div>

        {/* Infos clés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FDFBF7] p-4 rounded-xl border border-[#EFECE6]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white border border-[#EFECE6] text-[#D95D39] rounded-lg shadow-2xs">
              👥
            </span>
            <div>
              <span className="block text-xs text-[#666666] font-medium">
                Réservation
              </span>
              <span className="text-[#2C2C2C] font-semibold">
                Minimum {dataMenu.nb_perso_min} personnes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white border border-[#EFECE6] text-emerald-700 rounded-lg shadow-2xs">
              📦
            </span>
            <div>
              <span className="block text-xs text-[#666666] font-medium">
                Disponibilité
              </span>
              <span className="text-[#2C2C2C] font-semibold">
                {dataMenu.quantite_restante} menus restants en stock
              </span>
            </div>
          </div>
        </div>

        {/* Composition du menu par type de plat ordonné */}
        <div className="space-y-6">
          <h2 className="text-sm font-semibold text-[#888888] uppercase tracking-wider">
            Composition du menu
          </h2>

          {platsByType &&
            ['Entrée', 'Plat', 'Dessert']
              .filter(
                (type) => platsByType[type] && platsByType[type].length > 0,
              )
              .map((type) => (
                <div key={type} className="space-y-3">
                  <h3 className="text-md font-serif font-bold text-[#2C2C2C] uppercase tracking-wide border-b border-[#EFECE6] pb-1">
                    {type}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {platsByType[type].map((plat) => (
                      <div
                        key={plat.plat_id}
                        className="flex items-center p-4 bg-[#FDFBF7] rounded-xl border border-[#EFECE6] shadow-2xs gap-4"
                      >
                        <img
                          src={plat.photo}
                          alt={plat.nom}
                          className="w-16 h-16 object-cover rounded-lg border border-[#EFECE6] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block font-medium text-[#2C2C2C] text-base truncate">
                            {plat.nom}
                          </span>
                          {plat.alergenes.length > 0 && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                              ⚠️ {plat.alergenes.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>

        {/* Note particulière */}
        {dataMenu.note_particuliere && (
          <div className="bg-amber-50/60 border-l-4 border-amber-400 p-4 rounded-r-xl text-[#2C2C2C] text-sm">
            <span className="font-semibold block text-amber-900 mb-1">
              Note particulière :
            </span>
            {dataMenu.note_particuliere}
          </div>
        )}
      </div>
    </div>
  );
}
