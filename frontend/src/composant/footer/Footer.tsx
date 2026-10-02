/** @format */

import DataEntreprise from "./Data_Entreprise.js";
import HorairesList from "./Horaires_List";
import IdentityComposant from "./Identity_Composant.js";
import Politicy from "./Politicy.js";

export default function Footer_composant() {
  return (
    <footer className="flex flex-col bg-[RGBA(105,230,140,1)] ">
      <div className="flex flex-col md:flex-row items-center md:justify-around  my-2 gap-2 md:gap-0.5">
        <HorairesList />
        <IdentityComposant />
        <Politicy />
      </div>
      <DataEntreprise />
    </footer>
  );
}
