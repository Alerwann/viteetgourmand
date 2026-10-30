/** @format */

import React, { useState, useEffect } from "react";
import { DishType, type Plat } from "../../interfaces/plat";
import CustomButton from "../global/button_global";
import type { Theme } from "../../interfaces/theme";
import type { MenusInt } from "../../interfaces/menus";
import type { Regime } from "../../interfaces/regime";

const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2 items-center w-8/10 text-center p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function MenuCreateFor() {
  const [array_plats, setArrayPlats] = useState<Plat[]>([]);
  const [array_theme, setArrayTheme] = useState<Theme[]>([]);
  const [array_regime, setArrayRegime] = useState<Regime[]>([]);

  const [menuData, setMenuData] = useState<MenusInt>({
    menu_titre: "",
    nb_perso_min: 0,
    menu_prix: 0,
    description: "",
    quantite_restante: 0,
    regime_id: -1,
    theme_id: -1,
    note_particuliere: "",
  });

  const [plats, setPlats] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("http://localhost:8000/api/plat.php")
      .then((res) => res.json())
      .then((data) => setArrayPlats(data))
      .catch((err) => console.error("Erreur chargement :", err));

    fetch("http://localhost:8000/api/theme.php")
      .then((res) => res.json())
      .then((data) => setArrayTheme(data))
      .catch((err) => console.error("Erreur chargement :", err));

    fetch("http://localhost:8000/api/regime.php")
      .then((res) => res.json())
      .then((data) => setArrayRegime(data))
      .catch((err) => console.error("Erreur chargement :", err));
  }, []);

  const listPlatsByType = array_plats.reduce<Record<string, Plat[]>>(
    (acc, plat) => {
      if (!acc[plat.type_plat]) {
        acc[plat.type_plat] = [];
      }
      acc[plat.type_plat].push(plat);

      return acc;
    },
    {},
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setMenuData((prev) => ({
      ...prev,
      [name]: [
        "nb_perso_min",
        "menu_prix",
        "quantite_restante",
        "regime_id",
        "theme_id",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handlePlatChange = (typeDish: string, value: string) => {
    setPlats((prev) => ({
      ...prev,
      [typeDish]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (menuData.regime_id == -1) {
      alert("Merci de choisir un régime");
      return;
    }

    if (menuData.theme_id == -1) {
      alert("Merci de choisir un thème");
    }

    const platsIds = Object.values(plats)
      .filter((id) => id !== "")
      .map((id) => Number(id));

    const payload = {
      titre: menuData.menu_titre,
      theme_id: menuData.theme_id,
      regime_id: menuData.regime_id,
      description: menuData.description,
      nb_perso_min: menuData.nb_perso_min,
      menu_prix: menuData.menu_prix,
      quantite_restante: menuData.quantite_restante,
      plats: platsIds,
    };

    try {
      const response = await fetch("http://localhost:8000/api/menus.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
      }

      const result = await response.json();
      console.log("Menu créé avec succès :", result);
      alert("Menu ajouté");

      setMenuData({
        menu_titre: "",
        nb_perso_min: 0,
        menu_prix: 0,
        description: "",
        quantite_restante: 0,
        regime_id: -1,
        theme_id: -1,
        note_particuliere: "",
      });
      setPlats({});
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-5 mb-4"
    >
      <fieldset className={filesetAsset}>
        <legend>Intitulé</legend>

        <label htmlFor="menu_titre">Titre du menu</label>
        <input
          type="text"
          name="menu_titre"
          id="menu_titre"
          value={menuData.menu_titre}
          onChange={handleChange}
          className={inputAsset}
          required
        />

        <label htmlFor="theme_id">Quel est le thème du menu :</label>
        <select
          name="theme_id"
          id="theme_id"
          className={inputAsset}
          onChange={handleChange}
          value={menuData.theme_id}
          required
        >
          <option value="-1">-- Sélectionner le thème --</option>
          {array_theme.map((theme) => (
            <option value={theme.theme_id} key={theme.theme_id}>
              {theme.theme_nom}
            </option>
          ))}
        </select>
        <label htmlFor="regime_id">Quel est le régime du menu :</label>
        <select
          name="regime_id"
          id="regime_id"
          className={inputAsset}
          onChange={handleChange}
          value={menuData.regime_id}
          required
        >
          <option value="-1">-- Sélectionner le régime --</option>
          {array_regime.map((regime) => (
            <option value={regime.regime_id} key={regime.regime_id}>
              {regime.nom_regime}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description du menu</label>
        <textarea
          name="description"
          id="description"
          rows={5}
          cols={50}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.description}
          required
        ></textarea>

        <label htmlFor="note_particuliere">Informations supplémentaires</label>
        <textarea
          name="note_particuliere"
          id="note_particuliere"
          rows={5}
          cols={50}
          className={inputAsset}
          value={menuData.note_particuliere}
          onChange={handleChange}
        ></textarea>
      </fieldset>

      <fieldset className={filesetAsset}>
        <legend>Choix des plats</legend>
        {DishType.map((typeDish) => {
          return (
            <div key={typeDish} className="grid grid-cols-2 gap-4">
              <label htmlFor={typeDish}>Nom de {typeDish.toLowerCase()}</label>
              <select
                name={typeDish}
                id={typeDish}
                className={inputAsset}
                onChange={(e) => handlePlatChange(typeDish, e.target.value)}
              >
                <option value="">
                  --- Sélectionner un(e) {typeDish.toLowerCase()} ---
                </option>
                {listPlatsByType[typeDish]?.map((plat) => (
                  <option value={plat.plat_id} key={plat.plat_id}>
                    {plat.plat_nom}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </fieldset>

      <fieldset className={filesetAsset}>
        <legend>Quantité et Prix</legend>

        <label htmlFor="nb_perso_min">Nombre minimum de part</label>
        <input
          type="number"
          name="nb_perso_min"
          id="nb_perso_min"
          min={0}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.nb_perso_min}
          required
        />

        <label htmlFor="menu_prix">Prix par personne en €</label>

        <input
          type="number"
          name="menu_prix"
          id="menu_prix"
          min={0}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.menu_prix}
          required
        />

        <label htmlFor="quantite_restante">Quantité restante</label>
        <input
          type="number"
          name="quantite_restante"
          id="quantite_restante"
          min={0}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.quantite_restante}
          required
        />
      </fieldset>

      <CustomButton label="Enregistrer" type="submit" />
    </form>
  );
}
