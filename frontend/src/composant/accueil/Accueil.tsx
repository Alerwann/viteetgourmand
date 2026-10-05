/** @format */

import ZoneText from "../global/Zone_Text";
import tabText from "../../utils/text_présentation.json";

import ListAvisComposant from "./ListAvis";

export default function Accueil_coposant() {
  return (
    <div className="flex flex-col items-center  ">
      {tabText.map((items) => (
        <ZoneText textIn={items.description} titleIn={items.titre} />
      ))}
      <h3 className=" py-3  text-xl text-center ">
        Les retours de nos clients
      </h3>

      <ListAvisComposant />
      {/* <div className="flex  mx-10 p-2 bg-[#69e68c99] shadow-[10px_10px_15px_RGBA(0,0,0,0.25)] border-2 border-[RGBA(240,175,70,1)] rounded-xl justify-center"></div> */}
    </div>
  );
}
