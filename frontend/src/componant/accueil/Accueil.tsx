/** @format */
import { useEffect } from 'react';
import ZoneText from '../global/styles/Zone_Text';
import tabText from '../../utils/text_présentation.json';
import ListAvisComposant from './ListAvis';

export default function Accueil_coposant() {
  useEffect(() => {
    document.title = 'Vite & Gourmand | Bistro Moderne';
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#FDFBF7] text-[#2C2C2C] min-h-screen">
      {/* Section de présentation dynamique */}
      <div className="w-full max-w-5xl px-4 py-8 space-y-12">
        {tabText.map((items, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow-sm border border-[#EFECE6] transition-all hover:shadow-md"
          >
            <ZoneText textIn={items.description} titleIn={items.titre} />
          </div>
        ))}
      </div>

      {/* Séparateur élégant */}
      <div className="w-24 h-1 bg-[#D95D39] my-8 rounded-full"></div>

      {/* Section avis clients */}
      <div className="w-full bg-[#F7F4EE] py-12 border-t border-[#EFECE6]">
        <h3 className="text-2xl md:text-3xl font-serif text-center font-semibold text-[#2C2C2C] mb-2">
          Les retours de nos convives
        </h3>
        <p className="text-center text-sm text-[#666666] mb-8 font-sans">
          Ce que vous préférez dans notre cuisine
        </p>

        <ListAvisComposant />
      </div>
    </div>
  );
}
