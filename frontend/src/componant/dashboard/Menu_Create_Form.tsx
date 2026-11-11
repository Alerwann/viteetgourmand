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
import { SelectStyle } from '../global/styles/Formulaire/SelectStyle';
import { TextAreaStyle } from '../global/styles/Formulaire/textAreaStyle';

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
    regime_nom: '',
    theme_nom: '',
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
    let theme_nom = null;
    let theme_id = null;
    let regime_nom = null;
    let regime_id = null;

    console.log(name, value);
    console.log(array_theme);

    if (name === 'theme_id') {
      theme_nom = array_theme[Number(value)].theme_nom;
      theme_id = array_theme[Number(value)].theme_id;
      console.log(theme_nom);
    }

    if (name === 'regime_id') {
      regime_nom = array_regime[Number(value)].regime_nom;
      regime_id = array_regime[Number(value)].regime_id;
    }
    setMenuData((prev) => ({
      ...prev,
      [name]: [
        'nb_perso_min',
        'menu_prix',
        'quantite_restante',
        'regime_id',
      ].includes(name)
        ? Number(value)
        : value,
      'theme_nom': theme_nom ?? menuData.theme_nom,
      'theme_id': theme_id ?? menuData.theme_id,
      'regime_id': regime_id ?? menuData.regime_id,
      regime_nom: regime_nom ?? menuData.regime_nom,
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
      theme_nom: menuData.theme_nom,
      regime_nom: menuData.regime_nom,
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
        regime_nom: '',
        theme_id: -1,
        theme_nom: '',
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
          required
        />

        <SelectStyle
          label={'Thème du menu'}
          id={'theme'}
          name="theme_id"
          options={array_theme.map((theme, index) => ({
            value: index,
            label: theme.theme_nom,
          }))}
          defaultValue={'-- Sélectionner le thème --'}
          onChange={handleChange}
          required
        ></SelectStyle>

        <SelectStyle
          label={'Régime du menu'}
          id={'regime'}
          name="regime_id"
          options={array_regime.map((regime, index) => ({
            value: index,
            label: regime.regime_nom,
          }))}
          defaultValue={'-- Sélectionner le thème --'}
          onChange={handleChange}
          required
        ></SelectStyle>

        <TextAreaStyle
          label={'Description du menu'}
          id={'description'}
          onChange={handleChange}
          value={menuData.description}
        />
        <TextAreaStyle
          label="Note particulière"
          id="note_particuliere"
          value={menuData.note_particuliere}
          onChange={handleChange}
        />
      </FieldsetStyle>

      <FieldsetStyle legend="Choix de plats">
        {DishType.map((typeDish) => {
          return (
            <div key={typeDish.valueOf()} className="grid grid-cols-1">
              <SelectStyle
                label={typeDish}
                id={typeDish}
                name={typeDish}
                options={
                  listPlatsByType[typeDish]?.map((plat) => ({
                    value: plat.plat_id,
                    label: plat.plat_nom,
                  })) || []
                }
                defaultOptionText={`--- Sélectionner un(e) ${typeDish.toLowerCase()} ---`}
                onChange={(e) => handlePlatChange(typeDish, e.target.value)}
              />
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
          onChange={handleChange}
          value={menuData.quantite_restante}
          required
        />
      </FieldsetStyle>

      <CustomButton label="Enregistrer" type="submit" />
    </FormStyle>
  );
}
