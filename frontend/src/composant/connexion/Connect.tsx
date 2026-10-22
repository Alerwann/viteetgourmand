/** @format */

import CustomButton from "../global/button_global";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2  text-left p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function Connect_composant() {
  const [showPassword, setShowPassword] = useState(false);

  const onClikPass = () => {
    const newStatePass = !showPassword;
    setShowPassword(newStatePass);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <form action="" className="flex flex-col items-center gap-5 mb-4">
        <fieldset className={filesetAsset}>
          <legend>Connexion</legend>
          <label htmlFor="email">E-mail</label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              className={inputAsset}
            />
          </div>

          <label htmlFor="password">Mot de passe</label>
          <div className="flex flex-row gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="passwort"
              className={inputAsset}
            />
            <button type="button" onClick={onClikPass}>
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </fieldset>
        <CustomButton label="Connexion" type="submit" />
      </form>
      <section className="flex flex-col">
        <a href="" className="">
          Mot de passe oublié
        </a>
        <a href="">Créer un compte</a>
      </section>
    </div>
  );
}
