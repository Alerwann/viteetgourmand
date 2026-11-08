/** @format */

import React, { useState, useEffect } from 'react';
import { DishType, type Plat } from '../../interfaces/plat';
import CustomButton from '../global/styles/button_global';
import type { Theme } from '../../interfaces/theme';
import type { MenuDetail } from '../../interfaces/menus';
import type { Regime } from '../../interfaces/regime';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';

const inputAsset = 'bg-white border-2 p-2';

export default function MenuCreateFor() {
  const [array_plats, setArrayPlats] = useState<Plat[]>([]);
  const [array_theme, setArrayTheme] = useState<Theme[]>([]);
  const [array_regime, setArrayRegime] = useState<Regime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [menuData, setMenuData] = useState<MenuDetail>({
    menu_nom: '',
    nb_perso_min: 0,
    menu_prix: 0,
    description: '',
    quantite_restante: 0,
    regime_id: -1,
    theme_id: -1,
    note_particuliere: '',
    plats_details: [],
  });

  const [plats, setPlats] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsLoading(true);

    api
      .get('api/plat.php')
      .then((res) => setArrayPlats(res.data))
      .catch((err) => console.error('Erreur chargement :', err));

    api
      .get('api/theme.php')
      .then((res) => setArrayTheme(res.data))
      .catch((err) => console.error('Erreur chargement :', err));

    api
      .get('api/regime.php')
      .then((res) => setArrayRegime(res.data))
      .catch((err) => console.error('Erreur chargement :', err));
    setIsLoading(false);
  }, []);

  const listPlatsByType = array_plats.reduce<Record<string, Plat[]>>(
    (acc, plat) => {
      if (!acc[plat.type_plat]) {
        acc[plat.type_plat] = [];
      }
      acc[plat.type_plat].push(plat);

      return acc;
    },
    {},
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setMenuData((prev) => ({
      ...prev,
      [name]: [
        'nb_perso_min',
        'menu_prix',
        'quantite_restante',
        'regime_id',
        'theme_id',
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handlePlatChange = (typeDish: string, value: string) => {
    setPlats((prev) => ({
      ...prev,
      [typeDish]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (menuData.regime_id === -1) {
      alert('Merci de choisir un régime');
      return;
    }

    if (menuData.theme_id === -1) {
      alert('Merci de choisir un thème');
    }

    const platsIds = Object.values(plats)
      .filter((id) => id !== '')
      .map((id) => Number(id));

    const payload = {
      menu_nom: menuData.menu_nom,
      theme_id: menuData.theme_id,
      regime_id: menuData.regime_id,
      description: menuData.description,
      nb_perso_min: menuData.nb_perso_min,
      menu_prix: menuData.menu_prix,
      quantite_restante: menuData.quantite_restante,
      plat_id: platsIds,
      note_particulier: menuData.note_particuliere ?? null,
      plats_details: menuData.plats_details,
    };
    setIsLoading(true);
    try {
      await api.post('api/menus.php', payload);

      console.log('Menu créé avec succès ');
      alert('Menu ajouté');

      setMenuData({
        menu_nom: '',
        nb_perso_min: 0,
        menu_prix: 0,
        description: '',
        quantite_restante: 0,
        regime_id: -1,
        theme_id: -1,
        note_particuliere: '',
        plats_details: [],
      });
      setPlats({});
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <FormStyle onSubmit={handleSubmit}>
      <FieldsetStyle legend="Intitulé">
        <InputStyle
          label="Nom du menu"
          type="text"
          name="menu_nom"
          id="menu_nom"
          value={menuData.menu_nom}
          onChange={handleChange}
          className={inputAsset}
          required
        />

        <label htmlFor="theme_id">Quel est le thème du menu :</label>
        <select
          name="theme_id"
          id="theme_nom"
          className={inputAsset}
          onChange={handleChange}
          value={menuData.theme_id}
          required
        >
          <option value="-1">-- Sélectionner le thème --</option>
          {array_theme.map((theme) => (
            <option value={theme.theme_id} key={theme.theme_id}>
              {theme.theme_nom}
            </option>
          ))}
        </select>
        <label htmlFor="regime_id">Quel est le régime du menu :</label>
        <select
          name="regime_id"
          id="regime_nom"
          className={inputAsset}
          onChange={handleChange}
          value={menuData.regime_id}
          required
        >
          <option value="-1">-- Sélectionner le régime --</option>
          {array_regime.map((regime) => (
            <option value={regime.regime_id} key={regime.regime_id}>
              {regime.regime_nom}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description du menu</label>
        <textarea
          name="description"
          id="description"
          rows={5}
          cols={50}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.description}
          required
        ></textarea>

        <label htmlFor="note_particuliere">Informations supplémentaires</label>
        <textarea
          name="note_particuliere"
          id="note_particuliere"
          rows={5}
          cols={50}
          className={inputAsset}
          value={menuData.note_particuliere}
          onChange={handleChange}
        ></textarea>
      </FieldsetStyle>

      <FieldsetStyle legend="Choix de plats">
        {DishType.map((typeDish) => {
          return (
            <div key={typeDish} className="grid grid-cols-2 gap-4">
              <label htmlFor={typeDish}>Nom de {typeDish.toLowerCase()}</label>
              <select
                name={typeDish}
                id={typeDish}
                className={inputAsset}
                onChange={(e) => handlePlatChange(typeDish, e.target.value)}
              >
                <option value="">
                  --- Sélectionner un(e) {typeDish.toLowerCase()} ---
                </option>
                {listPlatsByType[typeDish]?.map((plat) => (
                  <option value={plat.plat_id} key={plat.plat_id}>
                    {plat.plat_nom}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </FieldsetStyle>

      <FieldsetStyle legend="Quantité et prix">
        <InputStyle
          label="Nombre minimum de part"
          type="number"
          name="nb_perso_min"
          id="nb_perso_min"
          min={0}
          onChange={handleChange}
          value={menuData.nb_perso_min}
          required
        />

        <InputStyle
          label="Prix par personne en €"
          type="number"
          name="menu_prix"
          id="menu_prix"
          min={0}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.menu_prix}
          required
        />

        <InputStyle
          label="Quantité restante"
          type="number"
          name="quantite_restante"
          id="quantite_restante"
          min={0}
          className={inputAsset}
          onChange={handleChange}
          value={menuData.quantite_restante}
          required
        />
      </FieldsetStyle>

      <CustomButton label="Enregistrer" type="submit" />
    </FormStyle>
  );
}
