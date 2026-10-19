/** @format */

import React, { useState, useEffect } from "react";
import { DishType, type Plat } from "../../interfaces/plat";
import CustomButton from "../global/button_global";
import type { Theme } from "../../interfaces/theme";
import type { MenusInt } from "../../interfaces/menus";

const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2 items-center w-8/10 text-center p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function MenuCreateFor() {
  const [array_plats, setArrayPlats] = useState<Plat[]>([]);
  const [array_theme, setArrayTheme] = useState<Theme[]>([]);

  const [menuData, setMenuData] = useState<MenusInt>({
    menu_titre: "",
    note_add: "",
    nombre_personne_minimum: 0,
    prix_par_personne: 0,
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
      // Conversion en nombre pour les champs numériques, sinon texte brut
      [name]: [
        "nombre_personne_minimum",
        "prix_par_personne",
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
    try {
      console.log(`titre : ${menuData.menu_titre}`);
      console.log(`theme : ${menuData.theme_id}`);
      console.log(`description : ${menuData.description}`);
      console.log(`note : ${menuData.note_add}`);
      console.log(`Entrée : ${plats["Entrée"]}`);
      console.log(`Plat : ${plats["Plat"]}`);
      console.log(`dessert : ${plats["Dessert"]}`);
      console.log(`Nb part: ${menuData.nombre_personne_minimum}`);
      console.log(`prix : ${menuData.prix_par_personne}`);
      console.log(`quantité restante : ${menuData.quantite_restante}`);
    } catch (error) {
      console.error(error);
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
        />

        <label htmlFor="theme_id">Quel est le thème du menu :</label>
        <select
          name="theme_id"
          id="theme_id"
          className={inputAsset}
          onChange={handleChange}
          value={menuData.theme_id}
        >
          <option value="-1">-- Sélectionner le thème --</option>
          {array_theme.map((theme) => (
            <option value={theme.theme_id} key={theme.theme_id}>
              {theme.theme_nom}
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
        ></textarea>

        <label htmlFor="note_add">Informations supplémentaires</label>
        <textarea
          name="note_add"
          id="note_add"
          rows={5}
          cols={50}
          className={inputAsset}
          value={menuData.note_add}
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
                    {plat.nom_plat}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </fieldset>

      <fieldset className={filesetAsset}>
        <legend>Quantité et Prix</legend>

        <label htmlFor="nombre_personne_minimum">Nombre minimum de part</label>
        <input
          type="number"
          name="nombre_personne_minimum"
          id="nombre_personne_minimum"
          min={0}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.nombre_personne_minimum}
          required
        />

        <label htmlFor="prix_par_personne">Prix par personne en €</label>
        <div>
          <input
            type="number"
            name="prix_par_personne"
            id="prix_par_personne"
            min={0}
            className={inputAsset}
            onChange={handleChange}
            value={menuData.prix_par_personne}
            required
          />
        </div>

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
