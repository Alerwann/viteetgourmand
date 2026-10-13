/** @format */
import type { menusInt } from "../../interfaces/menus";
import type { Theme } from "../../interfaces/theme";
import type { Regime } from "../../interfaces/regime";
import { useState, useEffect, useMemo } from "react";
import CardMenu from "./Card_menu";

export default function Menus_composant() {
  const [allMenus, setAllMenus] = useState<menusInt[]>([]);
  const [allTheme, setAllTheme] = useState<Theme[]>([]);
  const [allRegime, setAllRegime] = useState<Regime[]>([]);

  // États des filtres
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minRange, setMinRange] = useState<string>("");
  const [maxRange, setMaxRange] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [minGuests, setMinGuests] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/api/menus.php")
      .then((res) => res.json())
      .then((data) => setAllMenus(data))
      .catch((err) => console.error("Erreur fetch menus:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/theme.php")
      .then((res) => res.json())
      .then((data) => setAllTheme(data))
      .catch((err) => console.error("Erreur fetch theme:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/regime.php")
      .then((res) => res.json())
      .then((data) => setAllRegime(data))
      .catch((err) => console.error("Erreur fetch regime:", err));
  }, []);

  const filteredMenus = useMemo(() => {
    return allMenus.filter((menu) => {
      const price = menu.prix_par_personne;
      const guests = menu.nombre_personne_minimum;

      // 1. Filtre par prix maximum
      if (maxPrice !== "" && price > Number(maxPrice)) return false;

      // 2. Filtre sur une fourchette de prix
      if (minRange !== "" && price < Number(minRange)) return false;
      if (maxRange !== "" && price > Number(maxRange)) return false;

      // 3. Filtre par thème
      if (selectedTheme !== "all" && menu.theme_nom !== selectedTheme)
        return false;

      // 4. Filtre sur un régime (comparaison exacte ou via includes)
      if (selectedDiet !== "all" && menu.nom_regime !== selectedDiet)
        return false;

      // 5. Filtre par nombre de personnes minimum
      if (minGuests !== "" && guests < Number(minGuests)) return false;

      return true;
    });
  }, [
    allMenus,
    maxPrice,
    minRange,
    maxRange,
    selectedTheme,
    selectedDiet,
    minGuests,
  ]);

  return (
    <div className="min-h-screen p-10 flex flex-col items-center gap-6">
      <h2 className="text-3xl text-center font-bold">Choisissez votre menu</h2>

      {/* Barre de filtres front-end */}
      <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-6xl items-center justify-center">
        {/* Prix max */}
        <input
          type="number"
          placeholder="Prix max (€)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded"
          min={0}
        />

        {/* Fourchette de prix */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Prix min"
            value={minRange}
            onChange={(e) => setMinRange(e.target.value)}
            className="p-2 border rounded w-28"
            min={0}
          />
          <span>à</span>
          <input
            type="number"
            placeholder="Prix max"
            value={maxRange}
            onChange={(e) => setMaxRange(e.target.value)}
            className="p-2 border rounded w-28"
            min={0}
          />
        </div>

        {/* Thème */}
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">Tous les thèmes</option>
          {allTheme.map((theme) => (
            <option key={theme.theme_id} value={theme.theme_nom}>
              {theme.theme_nom}
            </option>
          ))}
        </select>

        {/* Régime */}
        <select
          value={selectedDiet}
          onChange={(e) => setSelectedDiet(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">Tous les régimes</option>
          {allRegime.map((regime) => (
            <option key={regime.regime_id} value={regime.nom_regime}>
              {regime.nom_regime}
            </option>
          ))}
        </select>

        {/* Nombre de personnes minimum */}
        <input
          type="number"
          placeholder="Min. personnes"
          value={minGuests}
          onChange={(e) => setMinGuests(e.target.value)}
          className="p-2 border rounded"
          min={1}
        />
      </div>

      {/* Affichage des menus filtrés */}
      <ul className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        {filteredMenus.map((menu) => (
          <li key={menu.menu_id}>
            <CardMenu
              menu_id={menu.menu_id}
              titre_menu={menu.menu_titre}
              description={menu.description}
              nb_minimal={menu.nombre_personne_minimum}
              price_by_person={menu.prix_par_personne}
              detail_plat={menu.plats_details}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
