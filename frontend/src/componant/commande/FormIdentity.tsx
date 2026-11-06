/** @format */

import type { Commande } from '../../interfaces/commande';
import type { utilisateurAuth } from '../../interfaces/utilisateur';
import AdresseForm from '../global/styles/Formulaire/AdresseForm';

import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';

interface FormIdentityData {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  utilisateur: utilisateurAuth;
  commande: Commande;
}

export default function FormIdentity({
  handleChange,
  utilisateur,
  commande,
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
        <InputStyle
          label="Heure de livraison"
          id="heure"
          type="time"
          name="prestation_heure"
          value={commande.commande_presta.prestation_heure}
          onChange={handleChange}
        />
        <InputStyle
          label="Date de livraison"
          id="date"
          type="date"
          name="prestation_date"
          value={commande.commande_presta.prestation_date}
          onChange={handleChange}
        />
        <AdresseForm
          handleChange={handleChange}
          adresse_postale={commande.commande_presta.prestation_adresse}
        ></AdresseForm>
      </FieldsetStyle>
    </div>
  );
}
