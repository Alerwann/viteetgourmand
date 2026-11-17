/** @format */

import React, { useEffect, useState } from 'react';
import AdresseForm from '../global/styles/Formulaire/AdresseForm';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import {
  initUtilisateur,
  type utilisateur,
} from '../../interfaces/utilisateur';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Loading from '../global/loading/Loading';
import CustomButton from '../global/styles/button_global';

export default function FormIdentity() {
  const [utilisateur, setUtilisateur] = useState<utilisateur>(initUtilisateur);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (user?.id === null) {
      alert('Erreur lors du chargement');
      return;
    }
    api
      .get(`api/utilisateur.php?id=${user?.id}`)
      .then((res) => setUtilisateur(res.data))
      .catch((err) => console.error('Erreur chargement :', err));
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

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
      alert('Votre compte a été modifié avec succès');

      setUtilisateur(initUtilisateur);
    } catch (error: any) {
      console.error('Erreur lors de la soumission :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (loading) return <Loading />;

  return (
    <FormStyle onSubmit={handleSubmit}>
      <FieldsetStyle legend="Identité">
        <InputStyle
          label="Nom"
          id="nom"
          name="nom"
          value={utilisateur.nom}
          onChange={handleChangeForm}
        />
        <InputStyle
          label="Prénom"
          id="prénom"
          name="prenom"
          value={utilisateur.prenom}
          onChange={handleChangeForm}
        />
        <AdresseForm
          adresse_postale={utilisateur.adresse_postale!}
          handleChange={handleChangeForm}
        />
        <InputStyle
          label="Email"
          id="email"
          value={utilisateur.email}
          type="email"
          onChange={handleChangeForm}
        />
        <InputStyle
          label="Telephone"
          id="telephone"
          value={utilisateur.telephone}
          type="tel"
          pattern="0[1-9](?:[0-9]{2}){4}"
          onChange={handleChangeForm}
        />
      </FieldsetStyle>
      <CustomButton label="Modifier" />
    </FormStyle>
  );
}
