/** @format */

import AvisHeader from "./Avis_Header";

export default function AvisCard() {
  return (
    <div className="flex flex-col w-100 bg-[RGBA(105,230,140,0.2)] border-2 rounded-2xl border-[RGBA(240,175,70,1)]">
      <AvisHeader />
      <p>Ici doit apparaitre la description de l'avis</p>
    </div>
  );
}
