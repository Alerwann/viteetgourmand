/** @format */

import CustomButton from '../global/styles/button_global';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { utilisateur } from '../../interfaces/utilisateur';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';

export default function CreateCompte() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [utilisateur, setUtilisateur] = useState<utilisateur>({
    email: '',
    password: '',
    prenom: '',
    nom: '',
    telephone: '',
    adresse_postale: {
      numero_rue: 0,
      street: '',
      ville: '',
      code_postal: 10000,
      pays: '',
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

  useEffect(() => {
    document.title = 'Création de compte | Vite & Gourmand';
  }, []);

  const onClikPass = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const adresseFields = [
      'numero_rue',
      'street',
      'ville',
      'code_postal',
      'pays',
    ];
    if (adresseFields.includes(name)) {
      setUtilisateur((prev) => ({
        ...prev,
        adresse_postale: {
          ...(prev.adresse_postale || {}),
          [name]: ['numero_rue', 'code_postal'].includes(name)
            ? Number(value)
            : value,
        } as NonNullable<utilisateur['adresse_postale']>,
      }));
    } else {
      setUtilisateur((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!(hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial)) {
      alert('Le mot de passe ne respecte pas les critères de sécurité.');
      setIsLoading(false);
      return;
    }

    const preload = {
      email: utilisateur.email,
      password: utilisateur.password,
      prenom: utilisateur.prenom,
      nom: utilisateur.nom,
      telephone: utilisateur.telephone,
      adresse_postale: {
        numero_rue: utilisateur.adresse_postale?.numero_rue,
        street: utilisateur.adresse_postale?.street,
        ville: utilisateur.adresse_postale?.ville,
        code_postal: utilisateur.adresse_postale?.code_postal,
        pays: utilisateur.adresse_postale?.pays,
      },
      is_actif: true,
      role_id: 2,
    };

    try {
      const response = await api.post('api/utilisateur.php', preload);
      console.log('Utilisateur créé avec succès :', response.data);
      alert('Votre compte a été créé avec succès');

      setUtilisateur({
        email: '',
        password: '',
        prenom: '',
        nom: '',
        telephone: '',
        adresse_postale: {
          numero_rue: 0,
          street: '',
          ville: '',
          code_postal: 10000,
          pays: '',
        },
        is_actif: false,
        role_id: 2,
      });
    } catch (error: any) {
      console.error('Erreur lors de la soumission :', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormStyle title="Créer un compte" onSubmit={handleSubmit}>
      <FieldsetStyle legend="Informations personnelles">
        <InputStyle
          label="E-mail"
          type="email"
          name="email"
          id="email"
          value={utilisateur.email}
          onChange={handleChange}
          required
        />

        <div className="contents">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#2C2C2C]"
          >
            Mot de passe
          </label>
          <div className="flex flex-col gap-2 w-full">
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                className="bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl w-full pr-10 text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] transition-all"
                value={utilisateur.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={onClikPass}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#2C2C2C]"
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {/* Liste des critères de mot de passe */}
            <ul className="text-xs flex flex-col gap-1 text-[#666666] bg-[#FDFBF7] p-3 rounded-xl border border-[#EFECE6]">
              <li style={{ color: hasMinLength ? '#10B981' : '#D95D39' }}>
                {hasMinLength ? '✔' : '✖'} 10 caractères minimum
              </li>
              <li style={{ color: hasUpper ? '#10B981' : '#D95D39' }}>
                {hasUpper ? '✔' : '✖'} Une majuscule
              </li>
              <li style={{ color: hasLower ? '#10B981' : '#D95D39' }}>
                {hasLower ? '✔' : '✖'} Une minuscule
              </li>
              <li style={{ color: hasNumber ? '#10B981' : '#D95D39' }}>
                {hasNumber ? '✔' : '✖'} Un chiffre
              </li>
              <li style={{ color: hasSpecial ? '#10B981' : '#D95D39' }}>
                {hasSpecial ? '✔' : '✖'} Un caractère spécial
              </li>
            </ul>
          </div>
        </div>

        <InputStyle
          label="Prénom"
          type="text"
          name="prenom"
          id="prenom"
          value={utilisateur.prenom}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Nom"
          type="text"
          name="nom"
          id="nom"
          value={utilisateur.nom}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Numéro de téléphone"
          type="tel"
          pattern="0[1-9](?:[0-9]{2}){4}"
          name="telephone"
          id="telephone"
          value={utilisateur.telephone}
          onChange={handleChange}
          required
        />
      </FieldsetStyle>

      <FieldsetStyle legend="Adresse postale">
        <InputStyle
          label="Numéro de rue"
          type="number"
          name="numero_rue"
          id="numero_rue"
          value={utilisateur.adresse_postale?.numero_rue}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Nom de la rue"
          type="text"
          name="street"
          id="street"
          value={utilisateur.adresse_postale?.street}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Code Postal"
          type="number"
          name="code_postal"
          id="code_postal"
          value={utilisateur.adresse_postale?.code_postal}
          min={10000}
          max={99999}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Ville"
          type="text"
          name="ville"
          id="ville"
          value={utilisateur.adresse_postale?.ville}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Pays"
          type="text"
          name="pays"
          id="pays"
          value={utilisateur.adresse_postale?.pays}
          onChange={handleChange}
          required
        />
      </FieldsetStyle>

      <div className="mt-6">
        <CustomButton label="Créer mon compte" type="submit" />
      </div>
    </FormStyle>
  );
}
