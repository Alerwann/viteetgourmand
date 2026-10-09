/** @format */

import { useState, useEffect } from "react";
import AvisCard from "./AvisCard";

import type { Avis } from "../../interfaces/avis";

export default function ListAvisComposant() {
  const [listeAvis, setListAvis] = useState<Avis[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/avis.php?status=publie")
      .then((res) => res.json())
      .then((data) => setListAvis(data))
      .catch((err) => console.error("Erreur fetch horaires:", err));
  }, []);

  if (listeAvis.length === 0) {
    return <div>Aucun avis encore poster</div>;
  }
  return (
    <div>
      {listeAvis.map((avis) => (
        <li key={avis.avis_id}>
          <AvisCard note={avis.note} description={avis.description} />
        </li>
      ))}
    </div>
  );
}
