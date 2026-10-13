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

  // États des filtres (fusion du prix max et de la fourchette en un seul filtre cohérent)
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [minGuests, setMinGuests] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/api/menus.php")
      .then((res) => res.json())
      .then((data) => setAllMenus(data))
      .catch((err) => console.error("Erreur fetch menus:", err));

    fetch("http://localhost:8000/api/theme.php")
      .then((res) => res.json())
      .then((data) => setAllTheme(data))
      .catch((err) => console.error("Erreur fetch theme:", err));

    fetch("http://localhost:8000/api/regime.php")
      .then((res) => res.json())
      .then((data) => setAllRegime(data))
      .catch((err) => console.error("Erreur fetch regime:", err));
  }, []);

  const filteredMenus = useMemo(() => {
    return allMenus.filter((menu) => {
      const price = menu.prix_par_personne;
      const guests = menu.nombre_personne_minimum;

      if (minPrice !== "" && price < Number(minPrice)) return false;
      if (maxPrice !== "" && price > Number(maxPrice)) return false;
      if (selectedTheme !== "all" && menu.theme_nom !== selectedTheme)
        return false;
      if (selectedDiet !== "all" && menu.nom_regime !== selectedDiet)
        return false;
      if (minGuests !== "" && guests < Number(minGuests)) return false;

      return true;
    });
  }, [allMenus, minPrice, maxPrice, selectedTheme, selectedDiet, minGuests]);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedTheme("all");
    setSelectedDiet("all");
    setMinGuests("");
  };

  const hasActiveFilters =
    minPrice ||
    maxPrice ||
    selectedTheme !== "all" ||
    selectedDiet !== "all" ||
    minGuests;

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Nos Menus
          </h1>
          <p className="mt-2 text-slate-600">
            Découvrez nos formules sur-mesure pour tous vos événements.
          </p>
        </div>

        {/* Barre de filtres moderne */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Filtrer les résultats
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Fourchette de prix */}
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-400 pl-2">Prix</span>
              <input
                type="number"
                placeholder="Min (€)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-transparent p-1 text-sm focus:outline-none"
                min={0}
              />
              <span className="text-slate-300">-</span>
              <input
                type="number"
                placeholder="Max (€)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-transparent p-1 text-sm focus:outline-none"
                min={0}
              />
            </div>

            {/* Thème */}
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              placeholder="Convives min. (ex: 4)"
              value={minGuests}
              onChange={(e) => setMinGuests(e.target.value)}
              className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={1}
            />
          </div>
        </div>

        {/* Grille d'affichage ou état vide */}
        {filteredMenus.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {filteredMenus.map((menu) => (
              <li key={menu.menu_id} className="h-full">
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
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-lg font-medium text-slate-600">
              Aucun menu ne correspond à vos critères.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow hover:bg-indigo-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
