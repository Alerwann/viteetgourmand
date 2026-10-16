/** @format */

import type { alergene } from "../../interfaces/alergene";

interface Props {
  setAlergeneArray: React.Dispatch<React.SetStateAction<alergene[]>>;
  alergenes: alergene[];
}

export default function AddAlergene({ setAlergeneArray, alergenes }: Props) {
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
              onChange={() => handleCheckboxChange(alergene)}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}
