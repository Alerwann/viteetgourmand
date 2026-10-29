/** @format */
import { useState } from "react";

import CustomButton from "../global/button_global";

/** @format */
const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2  text-left p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function ReinitPassword() {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };
  return (
    <div className="m-8 flex flex-col items-center ">
      <p>
        Un lien vous sera envoyé par email pour réinitialiser votre mot de
        passe.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 mb-4"
      >
        <fieldset className={filesetAsset}>
          <legend>Réinitialisation du mot de passe</legend>
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            className={inputAsset}
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </fieldset>
        <CustomButton label="Connexion" type="submit" />
      </form>
    </div>
  );
}
