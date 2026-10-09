/** @format */

import { useState, useEffect } from "react";
import AvisCard from "./AvisCard";

import type { Avis } from "../../interfaces/avis";

export default function ListAvisComposant() {
  const [listeAvis, setListAvis] = useState<Avis[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  useEffect(() => {
    const updateItemsVisible = () => {
      if (window.innerWidth < 1120) {
        setItemsVisible(1);
      } else if (window.innerWidth < 1500) {
        setItemsVisible(2);
      } else {
        setItemsVisible(3);
      }
    };

    updateItemsVisible();
    window.addEventListener("resize", updateItemsVisible);
    return () => window.removeEventListener("resize", updateItemsVisible);
  }, []);
  const maxIndex = Math.max(0, listeAvis.length - itemsVisible);

  // S'assurer que l'index courant ne dépasse pas le nouveau max si la fenêtre redimensionne
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

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
    <div className="flex lg:flex-row flex-col items-center gap-1.5 w-full md:w-9/10 p-30">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="p-2 bg-[#69e68c] rounded-full disabled:opacity-50 disabled:bg-gray-200 mr-2"
      >
        ◀
      </button>

      {/* Conteneur visible */}
      <div className="overflow-hidden w-full">
        <div
          className="flex flex-row gap-4 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
          }}
        >
          {listeAvis.map((avis) => (
            <li
              key={avis.avis_id}
              className="list-none shrink-0"
              style={{
                width: `calc(${100 / itemsVisible}% - ${(4 * (itemsVisible - 1)) / itemsVisible}px)`,
              }}
            >
              <AvisCard note={avis.note} description={avis.description} />
            </li>
          ))}
        </div>
      </div>

      {/* Bouton Suivant */}
      <button
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        className="p-2 bg-[#69e68c] rounded-full disabled:opacity-50 disabled:bg-gray-200 ml-2"
      >
        ▶
      </button>
    </div>
  );
}
