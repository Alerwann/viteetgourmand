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

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {};

  if (loading) return <Loading />;

  return (
    <FormStyle onSubmit={handleSubmit}>
      <FieldsetStyle legend="Identité">
        <InputStyle label="Nom" id="nom" name="nom" value={utilisateur.nom} />
        <InputStyle
          label="Prénom"
          id="prénom"
          name="prenom"
          value={utilisateur.prenom}
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
        />
        <InputStyle
          label="Telephone"
          id="telephone"
          value={utilisateur.telephone}
          type="tel"
          pattern="0[1-9](?:[0-9]{2}){4}"
        />
      </FieldsetStyle>
    </FormStyle>
  );
}
