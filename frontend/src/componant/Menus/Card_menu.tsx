/** @format */
import { Link } from 'react-router-dom';
import type { PlatDetail } from '../../interfaces/menus';
import CardComposant from '../global/styles/card';

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
  const allAllergens = Array.from(
    new Set(detail_plat?.flatMap((plat) => plat.alergenes) || []),
  );

  return (
    <CardComposant className="border border-[#EFECE6] bg-white hover:border-[#D95D39] transition-all">
      <div className="p-6 pb-4 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-serif font-bold text-[#2C2C2C] group-hover:text-[#D95D39] transition-colors">
            {titre_menu}
          </h3>
          <span className="text-lg font-extrabold text-[#D95D39] whitespace-nowrap">
            {price_by_person} €
          </span>
        </div>

        <p className="text-[#666666] text-sm line-clamp-2 leading-relaxed font-sans">
          {description}
        </p>
      </div>

      <div className="px-6 py-3 bg-[#FDFBF7] border-t border-b border-[#EFECE6] flex flex-col gap-3 grow">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
            Composition
          </span>
          <ul className="text-sm text-[#2C2C2C] space-y-0.5">
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
              {allAllergens.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Pied de carte (Infos min. convives + Bouton) */}
      <div className="p-6 pt-4 flex items-center justify-between gap-4">
        <div className="text-xs text-[#666666] flex items-center gap-1 font-medium">
          <span>👥</span> Min. {nb_minimal} pers.
        </div>

        <Link
          to={`/menus/${menu_id}`}
          className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#D95D39] text-[#FDFBF7] text-sm font-semibold rounded-xl shadow-sm transition-colors"
        >
          Voir le détail
        </Link>
      </div>
    </CardComposant>
  );
}
