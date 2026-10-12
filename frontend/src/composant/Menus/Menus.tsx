/** @format */
import type { menusInt } from "../../interfaces/menus";
import { useState, useEffect } from "react";
import CardMenu from "./Card_menu";
export default function Menus_composant() {
  const [allMenus, setAllMenus] = useState<menusInt[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/menus.php")
      .then((res) => res.json())
      .then((data) => setAllMenus(data))
      .catch((err) => console.error("Erreur fetch horaires:", err));
  }, []);
  return (
    <div className="h-screen p-10 flex flex-col items-center gap-4">
      <h2 className="text-3xl text-center ">Choisissez votre menu</h2>
      <ul className="grid grid-cols-4">
        {allMenus.map((menu) => (
          <li key={menu.menu_id}>
            <CardMenu
              menu_id={menu.menu_id}
              titre_menu={menu.menu_titre}
              description={menu.description}
              nb_minimal={menu.nombre_personne_minimum}
              price_by_person={menu.prix_par_personne}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
