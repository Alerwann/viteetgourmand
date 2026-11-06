/** @format */

import DataEntreprise from './Data_Entreprise.js';
import HorairesList from './Horaires_List';
import IdentityComposant from './Identity_Composant.js';
import Politicy from './Politicy.js';

export default function Footer_composant() {
  return (
    <footer className="w-full bg-[#2C2C2C] text-[#FDFBF7] pt-12 pb-6 border-t border-[#EFECE6]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenu principal du footer en 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between pb-10 border-b border-white/10">
          <div className="w-full flex justify-center md:justify-start">
            <HorairesList />
          </div>
          <div className="w-full flex justify-center">
            <IdentityComposant />
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <Politicy />
          </div>
        </div>

        {/* Informations légales / Entreprise en bas */}
        <div className="pt-6 text-center text-sm text-[#CCCCCC]">
          <DataEntreprise />
        </div>
      </div>
    </footer>
  );
}
