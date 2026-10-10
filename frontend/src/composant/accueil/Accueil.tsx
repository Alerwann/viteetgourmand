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
    </div>
  );
}
