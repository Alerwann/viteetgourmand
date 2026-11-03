/** @format */

import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';

export default function FormMenuCommmande() {
  return (
    <FieldsetStyle legend="Le Repas">
      <InputStyle label={'Nom du menu'} id={'nomMenu'} />
      <InputStyle label="Nombre de pars" id="nb_pars" type="number" min="0" />
    </FieldsetStyle>
  );
}
