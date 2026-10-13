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
  return (
    <div className="p-5 m-2 border-2 rounded-3xl flex flex-col items-center gap-4">
      <div>
        <div className="bg-amber-400 text-center py-1 font-extrabold text-2xl">
          <p>{titre_menu}</p>
        </div>
        <div>
          {detail_plat?.map((plat) => (
            <div key={plat.plat_id} className="mt-1">
              {plat.alergenes.length > 0 && (
                <div>⚠️ {plat.alergenes.join(", ")} </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-amber-300 text-l text-center px-2 ">
          <p>{description}</p>
        </div>
        <div className="flex gap-2 px-2 bg-amber-200">
          <p>Minimum de part : {nb_minimal}</p>
          <p>Prix / Personne : {price_by_person} €</p>
        </div>
      </div>

      <div className="m-3">
        <Link to={`/menus/${menu_id}`} className=" p-3 border-2 rounded-2xl">
          Détails
        </Link>
      </div>
    </div>
  );
}
