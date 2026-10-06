/** @format */
import { useEffect, useState } from "react";
import type { Horaire } from "../../interfaces/horaires";

export default function HorairesList() {
  const [horaires, setHoraires] = useState<Horaire[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/horaires.php")
      .then((res) => res.json())
      .then((data) => setHoraires(data))
      .catch((err) => console.error("Erreur fetch horaires:", err));
  }, []);
  return (
    <div className="p-3 text-center">
      <h3 className="pb-4">Nos Horaires d'ouverture : </h3>
      <ul>
        {horaires.map((item) => (
          <li key={item.jour}>
            <span className="capitalize ">{item.jour} : </span>
            {item.heure_ouverture === "-1" ? (
              <span>Fermé</span>
            ) : (
              <span>
                De {item.heure_ouverture}h à {item.heure_fermeture}h
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
