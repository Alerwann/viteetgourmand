/** @format */
import type { menusInt } from "../../interfaces/menus";
import { useState, useEffect } from "react";
export default function Menus_composant() {
  const [allMenus, setAllMenus] = useState<menusInt[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/menus.php")
      .then((res) => res.json())
      .then((data) => setAllMenus(data))
      .catch((err) => console.error("Erreur fetch horaires:", err));
  }, []);
  return (
    <div className="h-screen">
      <h3>Voici les noms des menus disponible</h3>
      <ul>
        {allMenus.map((menu) => (
          <li key={menu.menu_id}>
            <p>{menu.menu_titre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
