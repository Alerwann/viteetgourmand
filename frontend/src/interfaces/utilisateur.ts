/** @format */

export interface adressePostale {
  numero_rue?: number;
  street: string;
  ville: string;
  code_postal: number;
  pays: string;
}
export interface utilisateur {
  utilisateur_id?: number;
  email: string;
  password: string;
  prenom: string;
  nom: string;
  telephone: string;
  adresse_postale?: adressePostale;
  is_actif: boolean;
  role_id: number;
}

export const initUtilisateur: utilisateur = {
  email: '',
  prenom: 'Employe',
  nom: 'Compte',
  telephone: '0808080808',
  password: '',
  is_actif: true,
  role_id: 3,
};

export interface utilisateurAuth {
  utilisateur_id?: number;
  email: string;
  prenom: string;
  nom: string;
  telephone: string;
}

export const initUtilisateurAuth: utilisateurAuth = {
  utilisateur_id: -1,
  email: '',
  prenom: '',
  nom: '',
  telephone: '',
};
