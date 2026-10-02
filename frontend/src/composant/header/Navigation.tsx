/** @format */

"use client";

import { useState } from "react";
import convertType from "../../utils/convert_type";

export default function Navigation_composant() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>(() => {
    return localStorage.getItem("selectedType") || "Accueil";
  });

  const handleClick = (type: string) => {
    const newType = convertType(type);
    setTitle(newType);
    localStorage.setItem("selectedType", newType);
    setIsOpen(false);
  };

  return (
    <nav className=" flex flex-row py-1  bg-[#FDD5A4] relative z-50 ">
      <div className="md:hidden flex justify-center px-2 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-2 border-2 border-black rounded-lg bg-[#F1DA07]"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
      <div className="flex-2/3 text-3xl text-center md:hidden">{title}</div>

      <ul
        className={`
        ${isOpen ? "flex" : "hidden"} 
        flex-col items-center gap-4 py-10 absolute top-full left-0 w-80 md:w-full bg-[#FDD5A4] border-b-2 border-black shadow-lg
        md:static md:flex md:flex-row md:justify-evenly  md:border-none md:shadow-none
        list-none transition-all
      `}
      >
        {["accueil", "menus", "connect", "contact", "dashboard"].map((type) => (
          <li key={type}>
            <a
              onClick={() => handleClick(type)}
              href={type === "accueil" ? "/" : `./${type}`}
              className="hover:bg-[RGBA(105,230,140,1)] p-2 rounded-md text-l font-semibold font-marmelad"
            >
              {convertType(type)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
