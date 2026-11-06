/** @format */
import logo from '../../assets/logo.webp';
import Navigation_composant from './Navigation';

export default function Header_Componant() {
  return (
    <header className="w-full bg-[#FDFBF7] border-b border-[#EFECE6] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo et Nom de l'entreprise */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo de l'entreprise Vite & Gourmand"
            width={70}
            height={70}
            className="rounded-full object-cover border-2 border-[#D95D39] shadow-sm"
          />
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2C2C] tracking-tight">
            Vite & Gourmand
          </h1>
        </div>

        {/* Barre de navigation */}
        <div className="w-full md:w-auto">
          <Navigation_composant />
        </div>
      </div>
    </header>
  );
}
