/** @format */

import type { adressePostale } from '../../../../interfaces/utilisateur';
import { InputStyle } from './InputStyle';
interface AdresseForm {
  adresse_postale: adressePostale;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function AdresseForm({
  adresse_postale,
  handleChange,
}: AdresseForm) {
  return (
    <div className="contents">
      <InputStyle
        label="Numéro de rue"
        type="number"
        name="numero_rue"
        id="numero_rue"
        value={adresse_postale.numero_rue}
        onChange={handleChange}
      />
      <InputStyle
        label="Nom de la rue"
        type="text"
        name="street"
        id="street"
        value={adresse_postale.street}
        onChange={handleChange}
      />
      <InputStyle
        label="Code postal"
        type="number"
        name="code_postal"
        id="code_postal"
        value={adresse_postale.code_postal}
        min={10000}
        max={99999}
        onChange={handleChange}
      />
      <InputStyle
        label="Ville"
        type="text"
        name="ville"
        id="ville"
        value={adresse_postale.ville}
        onChange={handleChange}
      />
      <InputStyle
        label="Pays"
        type="text"
        name="pays"
        id="pays"
        value={adresse_postale.pays}
        onChange={handleChange}
      />
    </div>
  );
}
