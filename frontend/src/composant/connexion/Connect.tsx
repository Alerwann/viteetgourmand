/** @format */

import CustomButton from "../global/button_global";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { IdentConnexion } from "../../interfaces/identConnexion";

const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2  text-left p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function Connect_composant() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [identConnexion, setIdentConnexion] = useState<IdentConnexion>({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState<boolean>(false);

  const onClikPass = () => {
    const newStatePass = !showPassword;
    setShowPassword(newStatePass);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentConnexion({ ...identConnexion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const preload = {
      email: identConnexion.email,
      password: identConnexion.password,
    };

    try {
      const response = await fetch("http://localhost:8000/api/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preload),
      });

      response.status === 401 ? setShowError(true) : setShowError(false);

      if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 mb-4"
      >
        <fieldset className={filesetAsset}>
          <legend>Connexion</legend>
          <label htmlFor="email">E-mail</label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              className={inputAsset}
              value={identConnexion.email}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="password">Mot de passe</label>
          <div className="flex flex-row gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={inputAsset}
              value={identConnexion.password}
              onChange={handleChange}
            />
            <button type="button" onClick={onClikPass}>
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </fieldset>
        <CustomButton label="Connexion" type="submit" />
      </form>
      <section className="flex flex-col text-center gap-2 mb-4">
        {showError && (
          <span className="text-red-500 text-lg">
            Mail ou mot de passe incorrect
          </span>
        )}
        <a href="/reinit" className="">
          Mot de passe oublié
        </a>
        <a href="/createcompte">Créer un compte</a>
      </section>
    </div>
  );
}
