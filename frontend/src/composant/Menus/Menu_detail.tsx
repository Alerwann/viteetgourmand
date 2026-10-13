/** @format */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { menusInt } from "../../interfaces/menus";

export default function MenuDetail() {
  const { id } = useParams();
  const [dataMenu, setDataMenu] = useState<menusInt>();

  useEffect(() => {
    fetch(`http://localhost:8000/api/menus.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setDataMenu(data))
      .catch((err) => console.error("Erreur fetch horaires:", err));
  }, [id]);

  if (!dataMenu) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">
        Chargement ou erreur...
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* En-tête / Badge Thème */}
        <div className="bg-[RGBA(105,230,140,1)] text-black px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-100 rounded-full mb-3">
              {dataMenu.theme_nom}
            </span>
            <h1 className="text-3xl font-bold tracking-tight">
              {dataMenu.menu_titre}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-indigo-500">
              {dataMenu.prix_par_personne} €
            </div>
            <div className="text-xs text-slate-400">par personne</div>
          </div>
        </div>

        {/* Corps de la page */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Description
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              {dataMenu.description}
            </p>
          </div>

          {/* Infos clés (Min personnes & Stock) */}
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
                  Minimum {dataMenu.nombre_personne_minimum} personnes
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

          {/* Liste des Plats et Allergènes */}
          <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Composition du menu
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {dataMenu.plats_details?.map((plat) => (
                <div
                  key={plat.plat_id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm gap-2"
                >
                  <span className="font-medium text-slate-800 text-base">
                    {plat.nom}
                  </span>
                  {plat.alergenes.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                      ⚠️ {plat.alergenes.join(", ")}
                    </span>
                  )}
                </div>
              ))}
            </div>
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
    </div>
  );
}
