/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  initGetCommande,
  statusCommande,
  type GetCommande,
} from '../../interfaces/commande';

import Loading from '../global/loading/Loading';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import AdresseForm from '../global/styles/Formulaire/AdresseForm';
import { SelectStyle } from '../global/styles/Formulaire/SelectStyle';
import {
  getOne,
  saveCommande,
  updateCommandeField,
} from '../../services/commande_service';
import CustomButton from '../global/styles/button_global';
import { InputCheckbox } from '../global/styles/Formulaire/inputCheckbox';

export default function ModifCommande() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commande, setCommande] = useState<GetCommande>(initGetCommande);

  useEffect(() => {
    getOne(setCommande, setIsLoading, Number(id));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value, checked } = target;

    const fieldValue = type === 'checkbox' ? checked : value;

    updateCommandeField(name, fieldValue, setCommande);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await saveCommande(setIsLoading, commande);
  };

  if (isLoading) return <Loading />;

  return (
    <FormStyle onSubmit={handleSubmit} title="Commande">
      <FieldsetStyle legend="Commande">
        <InputStyle
          label="Référence"
          id="ref"
          name="ref"
          value={commande.commande_ref}
          readOnly
          disabled
        />
        <SelectStyle
          label="Status"
          id={'status'}
          value={commande.commande_status}
          name="commande_status"
          onChange={handleChange}
          options={statusCommande.map((status) => ({
            value: status,
            label: status.charAt(0).toUpperCase() + status.slice(1),
          }))}
        />

        <InputStyle
          label="Menu choisi"
          id="menu"
          value={commande.menu_nom}
          onChange={handleChange}
        />
        <InputStyle
          label="Nombre des personnes"
          id="nombre_personne"
          value={commande.nombre_personne}
          type="number"
          name="nombre_personne"
          onChange={handleChange}
        />
      </FieldsetStyle>
      <FieldsetStyle legend="Prêt de matériel">
        <InputCheckbox
          label={'Prêt de matériel ?'}
          id={'pret_materiel'}
          name="pret_materiel"
          onChange={handleChange}
        />
        <InputCheckbox
          label={'Matériel restistué ?'}
          id={'restitution_materiel'}
          disabled={!commande.commande_presta.pret_materiel}
          name="restitution_materiel"
          onChange={handleChange}
        />
      </FieldsetStyle>
      <FieldsetStyle legend="Livraison">
        <InputStyle
          label="date"
          type="date"
          id="date"
          name="prestation_date"
          value={commande.commande_presta.prestation_date}
          onChange={handleChange}
        />
        <InputStyle
          label="heure"
          id="heure"
          type="time"
          value={commande.commande_presta.prestation_heure}
          name="prestation_heure"
          onChange={handleChange}
        />
        <AdresseForm
          adresse_postale={commande.commande_presta.prestation_adresse}
          handleChange={handleChange}
        ></AdresseForm>
      </FieldsetStyle>
      <CustomButton label="Enregistrer" type="submit" />
    </FormStyle>
  );
}
