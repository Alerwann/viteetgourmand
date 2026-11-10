/** @format */
import { useState, useEffect } from 'react';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import { SelectStyle } from '../global/styles/Formulaire/SelectStyle';
import CustomButton from '../global/styles/button_global';
import { InputCheckbox } from '../global/styles/Formulaire/inputCheckbox';
import {
  initUtilisateur,
  type utilisateur,
} from '../../interfaces/utilisateur';
import api from '../../services/api';
import Loading from '../global/loading/Loading';

export default function GestionEmploye() {
  const [isExist, setIsExist] = useState<boolean>(false);
  const [allNotUser, setNotUser] = useState<utilisateur[]>([initUtilisateur]);
  const [employe, setEmploye] = useState<utilisateur>(initUtilisateur);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    api
      .get('api/utilisateur.php?notUser=true')
      .then((res) => setNotUser(res.data))
      .catch((err) => console.error('Erreur chargement :', err));
  }, []);

  const handleExistChange = () => {
    const oldIsExist = isExist;
    setIsExist(!oldIsExist);
    if (oldIsExist === true) {
      setEmploye(initUtilisateur);
    }
  };

  const handleEmployeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(allNotUser[Number(e.target.value)].utilisateur_id);
    setEmploye(allNotUser[Number(e.target.value)]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setEmploye((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const preload = {
      id: employe.utilisateur_id,
      email: employe.email,
      password: employe.password,
      prenom: employe.prenom,
      nom: employe.nom,
      telephone: employe.telephone,
      adresse_postale: {
        numero_rue: employe.adresse_postale?.numero_rue,
        street: employe.adresse_postale?.street,
        ville: employe.adresse_postale?.ville,
        code_postal: employe.adresse_postale?.code_postal,
        pays: employe.adresse_postale?.pays,
      },
      is_actif: employe.is_actif,
      role_id: employe.role_id,
    };
    if (isExist) {
      try {
        const response = await api.post(
          `api/utilisateur.php?id=${employe.utilisateur_id}`,
          preload,
        );
        console.log('Employé modifié avec succès :', response.data);
        alert('Employé modifié avec succès');

        setEmploye(initUtilisateur);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await api.post('api/utilisateur.php', preload);
        console.log('Employé créé avec succès :', response.data);
        alert('Le compte a été créé avec succès');

        setEmploye(initUtilisateur);
      } catch (error) {
        console.error('Erreur lors de la soumission :', error);
        alert('Erreur lors de la création du compte');
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (isLoading) <Loading />;
  return (
    <div>
      <h2>Formulaire de gestion d'employé</h2>

      <FormStyle onSubmit={handleSubmit}>
        <FieldsetStyle legend="Liste des employés">
          <InputCheckbox
            label={'Employé déjà existant'}
            id={'is_exist'}
            onChange={handleExistChange}
          />

          {isExist && (
            <div>
              <SelectStyle
                label={'Liste des employés'}
                id={'employes'}
                options={allNotUser.map((employe, index) => ({
                  value: index,
                  label: `${employe.nom} ${employe.prenom}`,
                }))}
                onChange={handleEmployeChange}
              ></SelectStyle>
            </div>
          )}
        </FieldsetStyle>
        <FieldsetStyle legend={'Informations civiles'}>
          <InputStyle
            label="Email"
            id={'email'}
            value={employe.email}
            name="email"
            onChange={handleChange}
          />
          {isExist && (
            <SelectStyle
              label="Statut"
              id="statut"
              value={Number(employe.is_actif)}
              options={[
                { value: 1, label: 'Activé' },
                { value: 0, label: 'Désactivé' },
              ]}
              name="is_actif"
              onChange={handleChange}
            ></SelectStyle>
          )}

          {!isExist && (
            <InputStyle
              label="Mot de passe"
              id="password"
              value={employe.password}
              name="password"
              onChange={handleChange}
            />
          )}
        </FieldsetStyle>
        <CustomButton label="Enregistrer" type="submit" />
      </FormStyle>
    </div>
  );
}
