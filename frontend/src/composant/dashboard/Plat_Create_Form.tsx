/** @format */
import { useEffect, useState, type SetStateAction } from "react";
import { DishType, type Plat } from "../../interfaces/plat";
import type { alergene } from "../../interfaces/alergene";
import AddAlergene from "./AddAlergene";
import CustomButton from "../global/button_global";

export default function PlatCreateForm() {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [alergenes, setAlergenes] = useState<alergene[]>([]);
  const [nom_plat, setNomPlat] = useState<string>("");
  const [type_plat, setTypePlat] = useState<string>("");
  const [alergene_array, setAlergeneArray] = useState<alergene[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/plat.php")
      .then((res) => res.json())
      .then((data) => setPlats(data))
      .catch((err) => console.error("Erreur chargement :", err));

    fetch("http://localhost:8000/api/alergene.php")
      .then((res) => res.json())
      .then((data) => setAlergenes(data))
      .catch((err) => console.error("Erreur chargement :", err));
  }, []);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault;
    console.log("ok");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nomPlat">Nom du plat</label>
      <input
        type="text"
        value={nom_plat}
        id="nomPlat"
        onChange={(e) => setNomPlat(e.target.value)}
      />
      <label htmlFor="typePlat">Types de plat</label>
      <select id="typePlat" onChange={(e) => setTypePlat(e.target.value)}>
        <option value={-1}>-- Choisissez le type de plat --</option>
        {DishType.map((dish, index) => (
          <option value={dish} key={index}>
            {dish}
          </option>
        ))}
      </select>
      <AddAlergene setAlergeneArray={setAlergeneArray} alergenes={alergenes} />
      <CustomButton label="Créer" type="submit" />
      {/* {alergene_array.map((alergene) => (
        <div key={alergene.alergene_id}>{alergene.alergene_nom}</div>
      ))} */}
    </form>
  );
}
