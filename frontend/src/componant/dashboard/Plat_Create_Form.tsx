/** @format */
import { useEffect, useState, type ChangeEvent } from 'react';
import type { alergene } from '../../interfaces/alergene';
import CustomButton from '../global/styles/button_global';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';
import { SelectStyle } from '../global/styles/Formulaire/SelectStyle';

export default function PlatCreateForm() {
  const [alergenes, setAlergenes] = useState<alergene[]>([]);
  const [plat_nom, setNomPlat] = useState<string>('');
  const [type_plat, setTypePlat] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [arrayAllergene, setArrayAllergene] = useState<alergene[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const MAX_SIZE = 16 * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_SIZE) {
        setErrorMessage('Le fichier est trop volumineux (16 Mo maximum).');
        setPhoto(null);
        e.target.value = '';
        return;
      }
      setErrorMessage(null);
      setPhoto(file);
    }
  };

  useEffect(() => {
    api
      .get('api/alergene.php')
      .then((res) => setAlergenes(res.data))
      .catch((err) => console.error('Erreur chargement :', err));
  }, []);

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

    console.log(type_plat);

    try {
      const formData = new FormData();
      formData.append('alergenes', JSON.stringify(arrayAllergene));
      formData.append('plat_nom', plat_nom);
      formData.append('type_plat', type_plat);
      if (photo) {
        formData.append('photo', photo);
      }

      await api.post('api/plat.php', formData);

      setNomPlat('');
      setTypePlat('');
      setPhoto(null);
      setArrayAllergene([]);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <FormStyle onSubmit={handleSubmit}>
      <InputStyle
        label="Nom du plat"
        type="text"
        value={plat_nom}
        id="nomPlat"
        onChange={(e) => setNomPlat(e.target.value)}
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
        options={[
          { value: 'Entrée', label: 'Entrée' },
          { value: 'Plat', label: 'Plat' },
          { value: 'Dessert', label: 'Dessert' },
        ]}
        defaultValue={'-- Selectionner le type de plat --'}
        onChange={(e) => setTypePlat(e.target.value)}
      />

      <ul className="grid grid-cols-3">
        {alergenes.map((alergene) => (
          <li key={alergene.alergene_id} className="grid grid-cols-2">
            <InputStyle
              label={alergene.alergene_nom}
              type="checkbox"
              id={String(alergene.alergene_id)}
              onChange={() => handleCheckboxChange(alergene)}
            />
          </li>
        ))}
      </ul>

      <CustomButton label="Créer" type="submit" />
    </FormStyle>
  );
}
