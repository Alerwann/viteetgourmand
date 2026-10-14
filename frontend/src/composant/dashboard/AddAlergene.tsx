/** @format */

import { useState } from "react";
import type { alergene } from "../../interfaces/alergene";

interface Props {
  // setAlergenes met à jour l'état du composant parent
  setAlergeneArray: React.Dispatch<React.SetStateAction<alergene[]>>;
  // alergenes représente ici la liste complète disponible (ou les sélectionnés selon la structure du parent)
  alergenes: alergene[];
}

export default function AddAlergene({ setAlergeneArray, alergenes }: Props) {
  const handleCheckboxChange = (currentAlergene: alergene) => {
    setAlergeneArray((prevSelected) => {
      // Vérifie si l'allergène est déjà présent dans le tableau du parent
      const exists = prevSelected.some(
        (item) => item.alergene_id === currentAlergene.alergene_id,
      );

      if (exists) {
        // S'il y est déjà, on le retire
        return prevSelected.filter(
          (item) => item.alergene_id !== currentAlergene.alergene_id,
        );
      } else {
        // S'il n'y est pas, on l'ajoute
        return [...prevSelected, currentAlergene];
      }
    });
  };

  return (
    <form>
      <ul>
        {alergenes.map((alergene) => (
          <li key={alergene.alergene_id}>
            <label htmlFor={String(alergene.alergene_id)}>
              {alergene.alergene_nom}
            </label>
            <input
              type="checkbox"
              id={String(alergene.alergene_id)}
              //   checked={alergenes.some(
              //     (item) => item.alergene_id === alergene.alergene_id,
              //   )}
              onChange={() => handleCheckboxChange(alergene)}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}
