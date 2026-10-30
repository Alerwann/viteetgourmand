/** @format */

import CustomButton from "../global/button_global";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { utilisateur } from "../../interfaces/utilisateur";

const inputAsset = "bg-white border-2 p-2";
const filesetAsset =
  "border-2 grid grid-cols-2  text-left p-4 mt-4 gap-4 bg-[rgba(245,245,245,0.7)]";

export default function CreateCompte() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [utilisateur, setUtilisateur] = useState<utilisateur>({
    email: "",
    password: "",
    prenom: "",
    nom: "",
    telephone: "",
    adresse_postale: {
      numero_rue: 0,
      street: "",
      ville: "",
      code_postal: 10000,
      pays: "",
    },
    is_actif: false,
    role_id: 2,
  });

  const pwd = utilisateur.password;
  const hasMinLength = pwd.length >= 10;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /\d/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

  const onClikPass = () => {
    const newStatePass = !showPassword;
    setShowPassword(newStatePass);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const adresseFields = [
      "numero_rue",
      "street",
      "ville",
      "code_postal",
      "pays",
    ];

    if (adresseFields.includes(name)) {
      setUtilisateur((prev) => ({
        ...prev,
        adresse_postale: {
          ...prev.adresse_postale,
          [name]: ["numero_rue", "code_postal"].includes(name)
            ? Number(value)
            : value,
        },
      }));
    } else {
      setUtilisateur((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // test des conditions de mot de passe
    if (!(hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial)) {
      alert("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }

    //création de l'objet utilisateur
    const preload = {
      email: utilisateur.email,
      password: utilisateur.password,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      telephone: utilisateur.telephone,
      adresse_postale: {
        numero_rue: utilisateur.adresse_postale.numero_rue,
        street: utilisateur.adresse_postale.street,
        ville: utilisateur.adresse_postale.ville,
        code_postal: utilisateur.adresse_postale.code_postal,
        pays: utilisateur.adresse_postale.pays,
      },
      is_actif: true,
      role_id: 2,
    };

    //envoie pour traitement back
    try {
      const response = await fetch(
        "http://localhost:8000/api/utilisateur.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preload),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
      }

      const result = await response.json();
      console.log("Utilisateur créé avec succès :", result);

      //faire envoie de mail ici
      alert("Utilisateur ajouté");

      //réinitialisation du formulaire
      setUtilisateur({
        email: "",
        password: "",
        prenom: "",
        nom: "",
        telephone: "",
        adresse_postale: {
          numero_rue: 0,
          street: "",
          ville: "",
          code_postal: 10000,
          pays: "",
        },
        is_actif: false,
        role_id: 2,
      });
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        action=""
        className="flex flex-col items-center gap-5 mb-4"
        onSubmit={handleSubmit}
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
              value={utilisateur.email}
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
              value={utilisateur.password}
              onChange={handleChange}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}"
            />
            <button type="button" onClick={onClikPass}>
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <ul className="text-xs flex flex-col gap-1 text-gray-700">
              <li style={{ color: hasMinLength ? "green" : "red" }}>
                {hasMinLength ? "✔" : "✖"} 10 caractères minimum
              </li>
              <li style={{ color: hasUpper ? "green" : "red" }}>
                {hasUpper ? "✔" : "✖"} Une majuscule
              </li>
              <li style={{ color: hasLower ? "green" : "red" }}>
                {hasLower ? "✔" : "✖"} Une minuscule
              </li>
              <li style={{ color: hasNumber ? "green" : "red" }}>
                {hasNumber ? "✔" : "✖"} Un chiffre
              </li>
              <li style={{ color: hasSpecial ? "green" : "red" }}>
                {hasSpecial ? "✔" : "✖"} Un caractère spécial
              </li>
            </ul>
          </div>

          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            name="prenom"
            id="prenom"
            className={inputAsset}
            value={utilisateur.prenom}
            onChange={handleChange}
          />
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            name="nom"
            id="nom"
            className={inputAsset}
            value={utilisateur.nom}
            onChange={handleChange}
          />
          <label htmlFor="telephone">Numéro de téléphone</label>
          <input
            type="tel"
            pattern="0[1-9](?:[0-9]{2}){4}"
            name="telephone"
            id="telephone"
            className={inputAsset}
            value={utilisateur.telephone}
            onChange={handleChange}
          />
          <label htmlFor="numero_rue">Numero de rue</label>
          <input
            type="number"
            name="numero_rue"
            id="numero_rue"
            className={inputAsset}
            value={utilisateur.adresse_postale.numero_rue}
            onChange={handleChange}
          />
          <label htmlFor="street">Nom de la rue</label>
          <input
            type="text"
            name="street"
            id="street"
            className={inputAsset}
            value={utilisateur.adresse_postale.street}
            onChange={handleChange}
          />
          <label htmlFor="code_postal">Code Postal</label>
          <input
            type="number"
            name="code_postal"
            id="code_postal"
            className={inputAsset}
            value={utilisateur.adresse_postale.code_postal}
            min={10000}
            max={99999}
            onChange={handleChange}
          />
          <label htmlFor="ville">Ville</label>
          <input
            type="text"
            name="ville"
            id="ville"
            className={inputAsset}
            value={utilisateur.adresse_postale.ville}
            onChange={handleChange}
          />
          <label htmlFor="pays">Pays</label>
          <input
            type="text"
            className={inputAsset}
            name="pays"
            id="pays"
            value={utilisateur.adresse_postale.pays}
            onChange={handleChange}
          />
        </fieldset>
        <CustomButton label="Créer mon compte" type="submit" />
      </form>
      {/* <section className="flex flex-col">
        <a href="" className="">
          Mot de passe oublié
        </a>
        <a href="">Créer un compte</a>
      </section> */}
    </div>
  );
}
