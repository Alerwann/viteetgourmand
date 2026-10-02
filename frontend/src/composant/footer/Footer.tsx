/** @format */

import { useEffect, useState } from "react";

interface HoraireData {
  jour: string;
  heure_ouverture: number;
  heure_fermeture: number;
}

export default function Footer_composant() {
  const [horaires, setHoraires] = useState<HoraireData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/get_horaires.php")
      .then((res) => res.json())
      .then((data) => setHoraires(data))
      .catch((err) => console.error("Erreur fetch horaires:", err));
  }, []);

  return (
    <footer>
      <h3>Nos Horaires d'ouverture</h3>
      <ul>
        {horaires.map((item) => (
          <li key={item.jour}>
            <span className="capitalize">{item.jour} : </span>
            {item.heure_ouverture === -1 ? (
              <span>Fermé</span>
            ) : (
              <span>
                De {item.heure_ouverture}h à {item.heure_fermeture}h
              </span>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
}
