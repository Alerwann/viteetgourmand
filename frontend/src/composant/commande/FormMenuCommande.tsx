/** @format */

import type { MenuDetail } from '../../interfaces/menus';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
interface FormMenuCommmandeInt {
  menuData: MenuDetail;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormMenuCommmande({
  menuData,
  handleChange,
}: FormMenuCommmandeInt) {
  return (
    <FieldsetStyle legend="Le Repas">
      <InputStyle
        label={'Nom du menu'}
        id={'nomMenu'}
        value={menuData.menu_nom}
        onChange={handleChange}
      />
      <InputStyle
        label="Nombre de pars"
        id="nb_pars"
        type="number"
        value={menuData.nb_perso_min}
        min={menuData.nb_perso_min}
        onChange={handleChange}
      />
    </FieldsetStyle>
  );
}
