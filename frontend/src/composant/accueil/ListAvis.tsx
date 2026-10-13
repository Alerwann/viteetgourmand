/** @format */

import { useState, useEffect } from "react";
import AvisCard from "./AvisCard";
import type { Avis } from "../../interfaces/avis";

export default function ListAvisComposant() {
  const [listeAvis, setListAvis] = useState<Avis[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  useEffect(() => {
    const updateItemsVisible = () => {
      if (window.innerWidth < 768) {
        setItemsVisible(1);
      } else if (window.innerWidth < 1280) {
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

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    fetch("http://localhost:8000/api/avis.php?status=publie")
      .then((res) => res.json())
      .then((data) => setListAvis(data))
      .catch((err) => console.error("Erreur fetch avis:", err));
  }, []);

  if (listeAvis.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        Aucun avis publié pour le moment.
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Ce que nos clients disent
        </h2>
        <p className="mt-2 text-slate-600">
          Découvrez les retours d'expérience de nos convives.
        </p>
      </div>

      <div className="relative flex items-center">
        {/* Bouton Précédent */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute -left-4 sm:-left-6 z-10 p-3 bg-white border border-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Avis précédent"
        >
          ◀
        </button>

        {/* Conteneur visible du carrousel */}
        <div className="overflow-hidden w-full mx-4 sm:mx-8 py-2">
          <ul
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
            }}
          >
            {listeAvis.map((avis) => (
              <li
                key={avis.avis_id}
                className="shrink-0"
                style={{
                  width: `calc(${100 / itemsVisible}% - ${(24 * (itemsVisible - 1)) / itemsVisible}px)`,
                }}
              >
                <div className="h-full">
                  <AvisCard note={avis.note} description={avis.description} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bouton Suivant */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute -right-4 sm:-right-6 z-10 p-3 bg-white border border-slate-200 text-slate-700 rounded-full shadow-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Avis suivant"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
