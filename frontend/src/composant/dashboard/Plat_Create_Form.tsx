/** @format */
import { useEffect, useState, type ChangeEvent } from "react";
import { DishType } from "../../interfaces/plat";
import type { alergene } from "../../interfaces/alergene";
import CustomButton from "../global/button_global";

export default function PlatCreateForm() {
  const [alergenes, setAlergenes] = useState<alergene[]>([]);
  const [nom_plat, setNomPlat] = useState<string>("");
  const [type_plat, setTypePlat] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [alergene_array, setAlergeneArray] = useState<alergene[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const MAX_SIZE = 2 * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setErrorMessage("Le fichier est trop volumineux (2 Mo maximum).");
        setPhoto(null);
        e.target.value = "";
        return;
      }
      setErrorMessage(null);
      setPhoto(file);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/alergene.php")
      .then((res) => res.json())
      .then((data) => setAlergenes(data))
      .catch((err) => console.error("Erreur chargement :", err));
  }, []);

  const handleCheckboxChange = (currentAlergene: alergene) => {
    setAlergeneArray((prevSelected) => {
      const exists = prevSelected.some(
        (item) => item.alergene_id === currentAlergene.alergene_id,
      );

      if (exists) {
        return prevSelected.filter(
          (item) => item.alergene_id !== currentAlergene.alergene_id,
        );
      } else {
        return [...prevSelected, currentAlergene];
      }
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nom_plat", nom_plat);
      formData.append("type_plat", type_plat);
      if (photo) {
        formData.append("photo", photo);
      }

      const responsePlat = await fetch("http://localhost:8000/api/plat.php", {
        method: "POST",
        body: formData,
      });

      const dataPlat = await responsePlat.json();

      if (!responsePlat.ok) {
        throw new Error(
          dataPlat.message || "Erreur lors de la création du plat",
        );
      }

      const nouveauPlatId = dataPlat.plat_id;

      const responseLiaison = await fetch(
        "http://localhost:8000/api/plat_alergene.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plat_id: nouveauPlatId,
            alergene_ids: alergene_array.map((a) => a.alergene_id),
          }),
        },
      );
      if (!responseLiaison.ok) {
        throw new Error("Erreur lors de l'association des allergènes");
      }

      console.log("Plat et allergènes enregistrés avec succès !");

      setNomPlat("");
      setTypePlat("");
      setPhoto(null);
      setAlergeneArray([]);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div>
        <label htmlFor="nomPlat">Nom du plat</label>
        <input
          type="text"
          value={nom_plat}
          id="nomPlat"
          onChange={(e) => setNomPlat(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="photo">Charger une photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
        />
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
      <div>
        <label htmlFor="typePlat">Types de plat</label>
        <select
          id="typePlat"
          value={type_plat}
          onChange={(e) => setTypePlat(e.target.value)}
        >
          <option value={-1}>-- Choisissez le type de plat --</option>
          {DishType.map((dish, index) => (
            <option value={dish} key={index}>
              {dish}
            </option>
          ))}
        </select>
      </div>
      <div>
        <ul>
          {alergenes.map((alergene) => (
            <li key={alergene.alergene_id}>
              <label htmlFor={String(alergene.alergene_id)}>
                {alergene.alergene_nom}
              </label>
              <input
                type="checkbox"
                id={String(alergene.alergene_id)}
                onChange={() => handleCheckboxChange(alergene)}
              />
            </li>
          ))}
        </ul>
      </div>

      <CustomButton label="Créer" type="submit" />
    </form>
  );
}
