/** @format */

import api from './api';
import type { GetCommande } from '../interfaces/commande';
import createREfCommande from '../utils/create_ref_commande';
import { getShippingForAddress } from '../utils/distance_calcul';

export const getAll = async <T>(
  setData: (data: T) => void,
  setLoading: (loading: boolean) => void,
) => {
  setLoading(true);
  try {
    const res = await api.get('api/commande.php');
    setData(res.data);
  } catch (err) {
    console.error('Erreur chargement :', err);
  } finally {
    setLoading(false);
  }
};

export const getOne = async <T>(
  setData: (data: T) => void,
  setLoading: (isLoading: boolean) => void,
  id: number,
) => {
  setLoading(true);
  try {
    const res = await api.get(`api/commande.php?id=${id}`);
    setData(res.data);
  } catch (err) {
    console.log('Erreur de chargement :', err);
  } finally {
    setLoading(false);
  }
};

export const saveCommande = async (
  setLoading: (isLoading: boolean) => void,
  commande: GetCommande,
) => {
  setLoading(true);

  const frais_livraison = await getShippingForAddress(
    commande.commande_presta.prestation_adresse,
  );

  const commandeREf = createREfCommande(
    commande.utilisateur_id!,
    commande.menu_id,
  );

  const playLoad = {
    commande_id: commande.commande_id,
    commande_date: commande.commande_date,
    commande_ref: commandeREf,
    nombre_personne: commande.nombre_personne,
    menu_id: commande.menu_id,
    menu_nom: commande.menu_nom,
    utilisateur_id: commande.utilisateur_id ?? -1,
    utilisateur_nom: commande.utilisateur_nom,
    utilisateur_prenom: commande.utilisateur_prenom,
    commande_presta: {
      prestation_date: commande.commande_presta.prestation_date,
      prestation_heure: commande.commande_presta.prestation_heure,
      prestation_adresse: commande.commande_presta.prestation_adresse,
      livraison_prix: frais_livraison.fraisDePort,
      pret_materiel: commande.commande_presta.pret_materiel,
      restitution_materiel: commande.commande_presta.restitution_materiel,
    },
    commande_status: commande.commande_status,
  };

  try {
    await api.post('api/commande.php', playLoad);
    alert('Commande enregistrée avec succès');
  } catch (error) {
    alert("Erreure lors de l'enregistrement");
    console.error('Erreur lors de la soumission :', error);
  } finally {
    setLoading(false);
  }
};

export const updateCommandeField = (
  name: string,
  value: string | number | boolean,
  setcommande: React.Dispatch<React.SetStateAction<GetCommande>>,
) => {
  const adresseFields = [
    'numero_rue',
    'street',
    'ville',
    'code_postal',
    'pays',
  ];
  const prestaField = [
    'prestation_heure',
    'prestation_date',
    'restitution_materiel',
    'pret_materiel',
  ];

  setcommande((prev) => {
    if (adresseFields.includes(name)) {
      return {
        ...prev,
        commande_presta: {
          ...prev.commande_presta,
          prestation_adresse: {
            ...prev.commande_presta.prestation_adresse,
            [name]: ['numero_rue', 'code_postal'].includes(name)
              ? Number(value)
              : value,
          },
        },
      };
    }

    if (prestaField.includes(name)) {
      return {
        ...prev,
        commande_presta: {
          ...prev.commande_presta,
          [name]: value,
        },
      };
    }

    return {
      ...prev,
      [name]: name === 'nombre_personne' ? Number(value) : value,
    };
  });
};
