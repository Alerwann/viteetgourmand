/** @format */

'use client';

import { useState } from 'react';
import convertType from '../../utils/convert_type';

export default function Navigation_composant() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>(() => {
    return localStorage.getItem('selectedType') || 'Accueil';
  });

  const handleClick = (type: string) => {
    const newType = convertType(type);
    setTitle(newType);
    localStorage.setItem('selectedType', newType);
    setIsOpen(false);
  };

  return (
    <nav className="flex flex-row items-center py-2 bg-transparent relative z-50">
      {/* Bouton Menu Burger (Mobile) */}
      <div className="md:hidden flex items-center px-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl p-2 border border-[#EFECE6] rounded-xl bg-white text-[#2C2C2C] shadow-sm hover:border-[#D95D39] transition-all"
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Titre dynamique mobile */}
      <div className="flex-1 text-2xl font-serif text-center md:hidden text-[#2C2C2C]">
        {title}
      </div>

      {/* Liste des liens */}
      <ul
        className={`
        ${isOpen ? 'flex' : 'hidden'} 
        flex-col items-center gap-4 py-6 absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-[#EFECE6] shadow-md
        md:static md:flex md:flex-row md:justify-end md:gap-8 md:bg-transparent md:border-none md:shadow-none md:py-0
        list-none transition-all
      `}
      >
        {['accueil', 'menus', 'connect', 'contact', 'dashboard'].map((type) => (
          <li key={type}>
            <a
              onClick={() => handleClick(type)}
              href={type === 'accueil' ? '/' : `/${type}`}
              className="text-[#2C2C2C] hover:text-[#D95D39] px-3 py-2 rounded-lg text-base font-medium font-sans transition-all hover:bg-[#F7F4EE] md:hover:bg-transparent"
            >
              {convertType(type)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
