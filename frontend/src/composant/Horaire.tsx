/** @format */

import { useState, useEffect } from "react";
import creat_hour_array from "../utils/init_array";

export default function Horaires() {
  const [daysChoice, setDaysChoice] = useState<string>("");
  const [openHour, setOpenHour] = useState<number>(9);
  const [closeHour, setCloseHour] = useState<number>(18);
  const [isClose, setIsClose] = useState<boolean>(false);
  const [arrayClose, setArrayClose] = useState<number[]>([]);

  const heuresOptions = Array.from({ length: 24 }, (_, index) => index);

  const daysOption = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  useEffect(() => {
    const newCloseArray = creat_hour_array(openHour + 1);
    setArrayClose(newCloseArray);
  }, [openHour]);

  const handleChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDaysChoice(event.target.value);
  };

  const handleChangeOpen = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOpenHour(Number(event.target.value));
  };
  const handleChangeClose = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCloseHour(Number(event.target.value));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!daysChoice) {
      alert("Veuillez choisir un jour.");
      return;
    }

    const formData = {
      jour: daysChoice,
      heure_ouverture: openHour,
      heure_fermeture: closeHour,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/update_horaires.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Horaire mis à jour avec succès !");
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de joindre le serveur.");
    }
  };

  const handleChangeIsClose = () => {
    var newStatut = !isClose;
    setIsClose(newStatut);
    if (newStatut) {
      setCloseHour(-1);
      setOpenHour(-1);
    } else {
      setOpenHour(9);
      setCloseHour(18);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div>
        <label htmlFor="days">Jour de la semaine</label>
        <select id="days" value={daysChoice} onChange={handleChangeDay}>
          <option value="">-- Choisissez un jour --</option>
          {daysOption.map((day) => (
            <option key={day} value={day.toLowerCase()}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="isClose">Etablissement fermé</label>
        <input
          id="isClose"
          type="checkbox"
          checked={isClose}
          onChange={handleChangeIsClose}
        />
      </div>
      {!isClose && (
        <>
          <div>
            <label htmlFor="openHour">Heure d'ouverture</label>
            <select id="openHour" value={openHour} onChange={handleChangeOpen}>
              <option value={-1}>-- Choisissez l'horaire --</option>
              {heuresOptions.map((heure) => (
                <option key={heure} value={heure}>
                  {heure} H
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="closeHour">Heure de fermeture</label>
            <select
              id="closeHour"
              value={closeHour}
              onChange={handleChangeClose}
            >
              <option value={-1}>-- Choisissez l'horaire --</option>
              {arrayClose.map((heure) => (
                <option key={heure} value={heure}>
                  {heure} H
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <div className="m-3">
        <button type="submit" className="p-2 bg-amber-300">
          Valider
        </button>
      </div>
    </form>
  );
}
