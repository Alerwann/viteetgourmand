/** @format */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MenuDetail } from "../../interfaces/menus";
import CustomButton from "../global/button_global";

export default function MenuDetail() {
  const { id } = useParams();
  const [dataMenu, setDataMenu] = useState<MenuDetail>();

  useEffect(() => {
    fetch(`http://localhost:8000/api/menus.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setDataMenu(data))
      .catch((err) => console.error("Erreur fetch menu:", err));
  }, [id]);

  console.log(dataMenu?.plats_details);

  if (!dataMenu) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">
        Chargement ou erreur...
      </div>
    );
  }

  // Groupement des plats par type_plat
  const platsByType = dataMenu.plats_details?.reduce(
    (acc, plat) => {
      const type = plat.type_plat || "autres";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(plat);
      return acc;
    },
    {} as Record<string, typeof dataMenu.plats_details>,
  );
  console.log(dataMenu);
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col items-center gap-4 my-8 pt-2">
      <CustomButton label="Commander" type="button" to="/commande" />
      <div className="bg-[RGBA(105,230,140,1)] w-full text-black px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-100 rounded-full mb-3">
            {dataMenu.theme_nom}
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            {dataMenu.menu_nom}
          </h1>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-indigo-500">
            {dataMenu.menu_prix} €
          </div>
          <div className="text-xs text-slate-400">par personne</div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Description
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            {dataMenu.description}
          </p>
        </div>

        {/* Infos clés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              👥
            </span>
            <div>
              <span className="block text-xs text-slate-500 font-medium">
                Réservation
              </span>
              <span className="text-slate-800 font-semibold">
                Minimum {dataMenu.nb_perso_min} personnes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              📦
            </span>
            <div>
              <span className="block text-xs text-slate-500 font-medium">
                Disponibilité
              </span>
              <span className="text-slate-800 font-semibold">
                {dataMenu.quantite_restante} menus restants en stock
              </span>
            </div>
          </div>
        </div>

        {/* Composition du menu par type de plat ordonné */}
        <div className="space-y-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Composition du menu
          </h2>

          {platsByType &&
            ["Entrée", "Plat", "Dessert"]
              .filter(
                (type) => platsByType[type] && platsByType[type].length > 0,
              )
              .map((type) => (
                <div key={type} className="space-y-3">
                  {/* Entête du type */}
                  <h3 className="text-md font-bold text-slate-700 uppercase tracking-wide border-b pb-1">
                    {type}
                  </h3>

                  {/* Nom et photo en dessous */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {platsByType[type].map((plat) => (
                      <div
                        key={plat.plat_id}
                        className="flex items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm gap-4"
                      >
                        <img
                          src={plat.photo}
                          alt={plat.nom}
                          className="w-16 h-16 object-cover rounded-lg border border-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block font-medium text-slate-800 text-base truncate">
                            {plat.nom}
                          </span>
                          {plat.alergenes.length > 0 && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                              ⚠️ {plat.alergenes.join(", ")}
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
          <div className="bg-amber-50/60 border-l-4 border-amber-400 p-4 rounded-r-xl text-slate-700 text-sm">
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
