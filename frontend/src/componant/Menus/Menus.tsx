/** @format */
import type { MenuDetail } from '../../interfaces/menus';
import type { Theme } from '../../interfaces/theme';
import type { Regime } from '../../interfaces/regime';
import { useState, useEffect, useMemo } from 'react';
import CardMenu from './Card_menu';
import CardComposant from '../global/styles/card';
import api from '../../services/api';

export default function Menus_composant() {
  const [allMenus, setAllMenus] = useState<MenuDetail[]>([]);
  const [allTheme, setAllTheme] = useState<Theme[]>([]);
  const [allRegime, setAllRegime] = useState<Regime[]>([]);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [minGuests, setMinGuests] = useState<string>('');

  useEffect(() => {
    document.title = 'Menus | Vite & Gourmand';
  }, []);

  useEffect(() => {
    api
      .get('api/menus.php')
      .then((res) => setAllMenus(res.data))
      .catch((err) => console.error('Erreur fetch menus:', err));

    api
      .get('api/theme.php')
      .then((res) => setAllTheme(res.data))
      .catch((err) => console.error('Erreur fetch theme:', err));

    api
      .get('api/regime.php')
      .then((res) => setAllRegime(res.data))
      .catch((err) => console.error('Erreur fetch regime:', err));
  }, []);

  const filteredMenus = useMemo(() => {
    return allMenus.filter((menu) => {
      const price = menu.menu_prix;
      const guests = menu.nb_perso_min;

      if (minPrice !== '' && price < Number(minPrice)) return false;
      if (maxPrice !== '' && price > Number(maxPrice)) return false;
      if (selectedTheme !== 'all' && menu.theme_nom !== selectedTheme)
        return false;
      if (selectedDiet !== 'all' && menu.regime_nom !== selectedDiet)
        return false;
      if (minGuests !== '' && guests < Number(minGuests)) return false;

      return true;
    });
  }, [allMenus, minPrice, maxPrice, selectedTheme, selectedDiet, minGuests]);

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedTheme('all');
    setSelectedDiet('all');
    setMinGuests('');
  };

  const hasActiveFilters =
    minPrice ||
    maxPrice ||
    selectedTheme !== 'all' ||
    selectedDiet !== 'all' ||
    minGuests;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl font-serif font-extrabold text-[#2C2C2C] tracking-tight">
            Nos Menus
          </h1>
          <p className="mt-2 text-[#666666] font-sans">
            Découvrez nos formules sur-mesure pour tous vos événements.
          </p>
          <div className="w-16 h-1 bg-[#D95D39] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Barre de filtres moderne */}
        <CardComposant
          hoverChoice={false}
          className="bg-white border border-[#EFECE6] p-6 rounded-2xl shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#888888]">
              Filtrer les résultats
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-[#D95D39] hover:underline transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Fourchette de prix */}
            <div className="flex items-center gap-2 bg-[#FDFBF7] p-2 rounded-xl border border-[#EFECE6]">
              <span className="text-xs text-[#888888] pl-2">Prix</span>
              <input
                type="number"
                placeholder="Min (€)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-transparent p-1 text-sm text-[#2C2C2C] focus:outline-none"
                min={0}
              />
              <span className="text-[#CCCCCC]">-</span>
              <input
                type="number"
                placeholder="Max (€)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-transparent p-1 text-sm text-[#2C2C2C] focus:outline-none"
                min={0}
              />
            </div>

            {/* Thème */}
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] transition-all"
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
              className="bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] transition-all"
            >
              <option value="all">Tous les régimes</option>
              {allRegime.map((regime) => (
                <option key={regime.regime_id} value={regime.regime_nom}>
                  {regime.regime_nom}
                </option>
              ))}
            </select>

            {/* Nombre de personnes minimum */}
            <input
              type="number"
              placeholder="Convives min. (ex: 4)"
              value={minGuests}
              onChange={(e) => setMinGuests(e.target.value)}
              className="bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] transition-all"
              min={1}
            />
          </div>
        </CardComposant>

        {/* Grille d'affichage ou état vide */}
        {filteredMenus.length > 0 ? (
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {filteredMenus.map((menu) => (
              <li key={menu.menu_id} className="h-full">
                <CardMenu
                  menu_id={menu.menu_id ? menu.menu_id : 0}
                  titre_menu={menu.menu_nom}
                  description={menu.description}
                  nb_minimal={menu.nb_perso_min}
                  price_by_person={menu.menu_prix}
                  detail_plat={menu.plats_details}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#EFECE6] shadow-sm">
            <p className="text-lg font-medium text-[#666666]">
              Aucun menu ne correspond à vos critères.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#2C2C2C] text-[#FDFBF7] rounded-xl text-sm font-semibold shadow-sm hover:bg-[#D95D39] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
