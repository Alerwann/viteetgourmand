/** @format */

import type { Commande } from '../../interfaces/commande';
import type { MenuDetail } from '../../interfaces/menus';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
interface FormMenuCommmandeInt {
  menuData: MenuDetail;
  commande: Commande;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormMenuCommmande({
  menuData,
  handleChange,
  commande,
}: FormMenuCommmandeInt) {
  return (
    <FieldsetStyle legend="Le Repas">
      <InputStyle
        label={'Nom du menu'}
        id={'nomMenu'}
        value={menuData.menu_nom}
        name="menu_nom"
        disabled
      />
      <InputStyle
        label="Nombre de pars"
        id="nb_pars"
        type="number"
        name="nombre_personne"
        value={
          commande.nombre_personne < menuData.nb_perso_min
            ? menuData.nb_perso_min
            : commande.nombre_personne
        }
        min={menuData.nb_perso_min}
        onChange={handleChange}
      />
    </FieldsetStyle>
  );
}
