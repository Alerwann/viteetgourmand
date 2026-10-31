/** @format */
import { useEffect, useState } from "react";

export default function FormCommande() {
  const [commandes, setCommandes] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/api/commande.php")
      .then((res) => res.json())
      .then((data) => setCommandes(data))
      .catch((err) => console.error("Erreur chargement :", err));
  }, []);
  return <div>ICI on mettra le formulaire</div>;
}
