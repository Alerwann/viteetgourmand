/** @format */
import { useEffect, useState, type ChangeEvent } from 'react';
import type { alergene } from '../../interfaces/alergene';
import CustomButton from '../global/styles/button_global';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';
import { SelectStyle } from '../global/styles/Formulaire/SelectStyle';
import { type PlatAlergenes, PlatAlergenInit } from '../../interfaces/plat';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputCheckbox } from '../global/styles/Formulaire/inputCheckbox';
import { SelectWithResearch } from '../global/styles/Formulaire/SelectWithResearch';

export default function PlatCreateForm() {
  const [alergenes, setAlergenes] = useState<alergene[]>([]);

  const [plat, setPlat] = useState<PlatAlergenes>(PlatAlergenInit);

  const [allPlats, setAllPlats] = useState<PlatAlergenes[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [arrayAllergene, setArrayAllergene] = useState<alergene[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExist, setIsExist] = useState<boolean>(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const MAX_SIZE = 16 * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setErrorMessage('Le fichier est trop volumineux (16 Mo maximum).');
        setPlat((prev) => ({ ...prev, photo: '' }));
        e.target.value = '';
        return;
      }
      setErrorMessage(null);
      setPlat((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleExistChange = () => {
    const oldIsExist = isExist;
    setIsExist(!oldIsExist);
    if (oldIsExist === true) {
      setPlat(PlatAlergenInit);
      setArrayAllergene([]);
    }
  };

  const handlePlatChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    const index = Number(e.target.value);
    if (isNaN(index) || index < 0) {
      console.log('error');
      return;
    }

    console.log(allPlats[index]);
    setPlat(allPlats[index]);
    // Met à jour les allergènes du plat sélectionné
    setArrayAllergene(allPlats[index].alergenes || []);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPlat((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    api
      .get('api/plat.php')
      .then((res) => setAllPlats(res.data))
      .catch((err) => console.error('Erreur chargement :', err));

    api
      .get('api/alergene.php')
      .then((res) => setAlergenes(res.data))
      .catch((err) => console.error('Erreur chargement :', err));
  }, [refreshTrigger]);

  const handleCheckboxChange = (currentAlergene: alergene) => {
    setArrayAllergene((prevSelected) => {
      const exists = prevSelected.some(
        (item) => item.alergene_id === currentAlergene.alergene_id,
      );
      if (exists) {
        return prevSelected.filter(
          (item) => item.alergene_id !== currentAlergene.alergene_id,
        );
      } else {
        return [...prevSelected, currentAlergene];
      }
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('alergenes', JSON.stringify(arrayAllergene));
      formData.append('plat_nom', plat.plat_nom);
      formData.append('type_plat', plat.type_plat);
      if (plat.photo) {
        formData.append('photo', plat.photo);
      }
      if (plat.plat_id) {
        formData.append('plat_id', plat.plat_id.toString());
      }

      await api.post('api/plat.php', formData);
      alert('La liste des plats et leur contenu à été mise à jour');
      setPlat(PlatAlergenInit);
      setArrayAllergene([]);
      setIsExist(false);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Erreur:', error);
      alert('La mise à jour des plats a rencontré une erreure');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const selectedPlatIndex = allPlats.findIndex(
    (p) => p.plat_id === plat?.plat_id,
  );

  return (
    <FormStyle onSubmit={handleSubmit}>
      <FieldsetStyle legend={'Choix plat existant'}>
        <InputCheckbox
          label={'Modifier un plat existant'}
          id={'isExist'}
          onChange={handleExistChange}
        />
        <div></div>
        {isExist && (
          <SelectWithResearch
            label="Liste des plats"
            id="plats"
            name="plats"
            options={allPlats.map((p, index) => ({
              value: index,
              label: p.plat_nom,
            }))}
            value={selectedPlatIndex !== -1 ? selectedPlatIndex : ''}
            onChange={handlePlatChange}
            defaultOptionText="--- Sélectionner un plat ---"
          />
        )}
      </FieldsetStyle>
      <InputStyle
        label="Nom du plat"
        type="text"
        value={plat.plat_nom}
        id="nomPlat"
        name="plat_nom"
        onChange={handleChange}
      />

      <InputStyle
        label="Choix de la photo"
        type="file"
        name="photo"
        id="photo"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <SelectStyle
        label={'Types de plat'}
        id={'type_plat'}
        name="type_plat"
        value={plat.type_plat}
        options={[
          { value: 'Entrée', label: 'Entrée' },
          { value: 'Plat', label: 'Plat' },
          { value: 'Dessert', label: 'Dessert' },
        ]}
        defaultOptionText={'-- Selectionner le type de plat --'}
        onChange={handleChange}
      />

      <ul className="grid grid-cols-3">
        {alergenes.map((alergene) => {
          const isChecked = arrayAllergene.some(
            (item) => item.alergene_nom === alergene.alergene_nom,
          );
          return (
            <li
              key={alergene.alergene_id}
              className="grid grid-cols-2 items-center"
            >
              <label htmlFor={String(alergene.alergene_id)}>
                {alergene.alergene_nom}
              </label>
              <input
                type="checkbox"
                id={String(alergene.alergene_id)}
                checked={isChecked}
                onChange={() => handleCheckboxChange(alergene)}
              />
            </li>
          );
        })}
      </ul>

      <CustomButton label="Créer" type="submit" />
    </FormStyle>
  );
}
