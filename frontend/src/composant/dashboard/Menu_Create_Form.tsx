/** @format */

import { useState, useEffect } from "react";
import { DishType, type Plat } from "../../interfaces/plat";
import CustomButton from "../global/button_global";

const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2 items-center w-8/10 text-center p-2 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function MenuCreateFor() {
  const [array_plats, setArrayPlats] = useState<Plat[]>([]);

  const [array_theme, setArrayTheme] = useState<string[]>([]);

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
      console.log(acc);
      return acc;
    },
    {},
  );

  const handleChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {};

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <form action="#" className="flex flex-col items-center gap-5 ">
      <fieldset className={filesetAsset}>
        <legend className="">Intitulé</legend>
        <label htmlFor="title">Titre du menu</label>
        <input type="text" name="title" id="title" className={inputAsset} />
        <label htmlFor="description">Description du menu</label>
        <textarea
          name="description"
          id="description"
          rows={5}
          cols={50}
          className={inputAsset}
        ></textarea>
        <label htmlFor="note_add">Informations supplémentaires</label>
        <textarea
          name="note_add"
          id="note_add"
          rows={5}
          cols={50}
          className={inputAsset}
        ></textarea>
      </fieldset>
      <fieldset className={filesetAsset}>
        <legend>Choix des plats</legend>
        {DishType.map((typeDish) => {
          return (
            <div key={typeDish} className="grid grid-cols-2 gap-4">
              <label htmlFor={typeDish}>Nom de {typeDish.toLowerCase()}</label>
              <select name={typeDish} id={typeDish} className={inputAsset}>
                <option value="">
                  --- Sélectionner un(e) {typeDish.toLowerCase()} ---
                </option>
                {listPlatsByType[typeDish]?.map((plat) => (
                  <option value={plat.nom_plat} key={plat.plat_id}>
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
        <label htmlFor="nb_min">Nombre minimum de part</label>
        <input
          type="number"
          name="nb_min"
          id="nb_min"
          min={0}
          className={inputAsset}
          required
        />
        <label htmlFor="prix_unit">Prix par personne</label>
        <div>
          {" "}
          <input
            type="number"
            name="prix_unit"
            id="prix_unit"
            min={0}
            className={inputAsset}
            required
          />
          <span> €</span>
        </div>

        <label htmlFor="quantite_rest">Quantité restante</label>
        <input
          type="number"
          name="quantite_rest"
          id="quantite_rest"
          min={0}
          className={inputAsset}
          required
        />
      </fieldset>
      <CustomButton label="Enregistrer" type="submit" />
    </form>
  );
}
