/** @format */
import { Link } from "react-router-dom";
import type { PlatDetail } from "../../interfaces/menus";

interface MenuData {
  menu_id: number;
  titre_menu: string;
  description: string;
  nb_minimal: number;
  price_by_person: number;
  detail_plat: PlatDetail[];
}

export default function CardMenu({
  menu_id,
  titre_menu,
  description,
  nb_minimal,
  price_by_person,
  detail_plat,
}: MenuData) {
  // Collecte et fusion unique de tous les allergènes du menu
  const allAllergens = Array.from(
    new Set(detail_plat?.flatMap((plat) => plat.alergenes) || []),
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
      {/* En-tête de la carte */}
      <div className="p-6 pb-4 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {titre_menu}
          </h3>
          <span className="text-lg font-extrabold text-indigo-600 whitespace-nowrap">
            {price_by_person} €
          </span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corps de la carte (Plats & Allergènes) */}
      <div className="px-6 py-3 bg-slate-50/50 border-t border-b border-slate-100 flex flex-col gap-3 grow">
        {/* Liste condensée des plats */}
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Composition
          </span>
          <ul className="text-sm text-slate-700 space-y-0.5">
            {detail_plat?.map((plat) => (
              <li key={plat.plat_id} className="truncate">
                • {plat.nom}
              </li>
            ))}
          </ul>
        </div>

        {/* Badge d'allergènes globaux si présents */}
        {allAllergens.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg w-fit">
            <span>⚠️</span>
            <span className="font-medium truncate max-w-50">
              {allAllergens.join(", ")}
            </span>
          </div>
        )}
      </div>

      {/* Pied de carte (Infos min. convives + Bouton) */}
      <div className="p-6 pt-4 flex items-center justify-between gap-4 bg-white">
        <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
          <span>👥</span> Min. {nb_minimal} pers.
        </div>

        <Link
          to={`/menus/${menu_id}`}
          className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow transition-colors"
        >
          Voir le détail
        </Link>
      </div>
    </div>
  );
}
