/** @format */

import { useState, useEffect } from 'react';
import creat_hour_array from '../../utils/init_array';
import type { Horaire } from '../../interfaces/horaires';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';
import CustomButton from '../global/styles/button_global';
import { SelectStyle } from '../global/styles/Formulaire/SelectStyle';

import { InputCheckbox } from '../global/styles/Formulaire/inputCheckbox';

export default function Horaires() {
  const [daysChoice, setDaysChoice] = useState<string>('');
  const [openHour, setOpenHour] = useState<number>(9);
  const [closeHour, setCloseHour] = useState<number>(18);
  const [isClose, setIsClose] = useState<boolean>(false);
  const [arrayClose, setArrayClose] = useState<number[]>([]);
  const [horaireList, setHorairesList] = useState<Horaire[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const heuresOptions = Array.from({ length: 24 }, (_, index) => index);

  const daysOption = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  useEffect(() => {
    setIsLoading(true);
    api
      .get('api/horaires.php')
      .then((res) => setHorairesList(res.data))
      .catch((err) => console.error('Erreur chargement :', err));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const newCloseArray = creat_hour_array(openHour + 1);
    setArrayClose(newCloseArray);
  }, [openHour]);

  const handleChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDaysChoice(event.target.value);
  };

  const handleChangeOpen = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOpenHour(Number(event.target.value));
  };
  const handleChangeClose = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCloseHour(Number(event.target.value));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!daysChoice) {
      alert('Veuillez choisir un jour.');
      return;
    }

    const existingHoraire = horaireList.find((h) => h.jour === daysChoice);

    const formData = {
      horaire_id: existingHoraire ? existingHoraire.horaire_id : null,
      jour: daysChoice,
      heure_ouverture: openHour,
      heure_fermeture: closeHour,
    };

    try {
      console.log(formData);
      await api.post('api/horaires.php', formData);
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert('Impossible de joindre le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeIsClose = () => {
    var newCommande_status = !isClose;
    setIsClose(newCommande_status);
    if (newCommande_status) {
      setCloseHour(-1);
      setOpenHour(-1);
    } else {
      setOpenHour(9);
      setCloseHour(18);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <FormStyle onSubmit={handleSubmit}>
      <SelectStyle
        label="Jour de la semaine"
        id="days"
        value={daysChoice}
        onChange={handleChangeDay}
        defaultOptionText="-- Choisissez un jour --"
        options={daysOption.map((day) => ({
          value: day.toLowerCase(),
          label: day,
        }))}
      />

      <InputCheckbox
        label="Etablissement fermé"
        id="isClose"
        onChange={handleChangeIsClose}
      />

      {!isClose && (
        <div className="flex md:flex-col gap-4 justify-center content-center ">
          <SelectStyle
            label={"Heure d'ouverture"}
            id={'openHour'}
            value={openHour}
            options={heuresOptions.map((heure) => ({
              value: heure,
              label: `${heure} H`,
            }))}
            onChange={handleChangeOpen}
          />
          <SelectStyle
            label="Heure de fermeture"
            id="closeHour"
            value={closeHour}
            onChange={handleChangeClose}
            options={arrayClose.map((heure) => ({
              value: heure,
              label: `${heure} H`,
            }))}
          />
        </div>
      )}
      <div className="m-3">
        <CustomButton label="Valider" type="submit" />
      </div>
    </FormStyle>
  );
}
