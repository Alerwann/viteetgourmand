/** @format */

import type {
  adressePostale,
  utilisateurAuth,
} from '../../interfaces/utilisateur';
import AdresseForm from '../global/styles/Formulaire/AdresseForm';

import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';

interface FormIdentityData {
  adresse_postale: adressePostale;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  utilisateur: utilisateurAuth;
}

export default function FormIdentity({
  adresse_postale,
  handleChange,
  utilisateur,
}: FormIdentityData) {
  return (
    <div>
      <FieldsetStyle legend="Client">
        <InputStyle label={'Nom'} id={'nom'} value={utilisateur.nom} disabled />
        <InputStyle
          label={'Prenom'}
          id={'prenom'}
          value={utilisateur.prenom}
          disabled
        />
        <InputStyle
          label={'Email'}
          id={'email'}
          value={utilisateur.email}
          disabled
        />
        <InputStyle
          label={'Téléphone'}
          id={'telephone'}
          value={utilisateur.telephone}
          disabled
        />
      </FieldsetStyle>
      <FieldsetStyle legend="Livraison">
        <InputStyle label="Heure de livraison" id="heure" type="time" />
        <InputStyle label="Date de livraison" id="date" type="date" />
        <AdresseForm
          handleChange={handleChange}
          adresse_postale={adresse_postale}
        ></AdresseForm>
      </FieldsetStyle>
    </div>
  );
}
