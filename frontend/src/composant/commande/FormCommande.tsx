/** @format */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Commande } from '../../interfaces/commande';
import { type utilisateurAuth } from '../../interfaces/utilisateur';

export default function FormCommande() {
  const { menuid } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const menu_id = menuid ? parseInt(menuid) : -1;
  const [utilisateur, setUtilisateur] = useState<utilisateurAuth>({
    utilisateur_id: -1,
    email: '',
    prenom: '',
    nom: '',
    telephone: '',
  });

  const [commande, setcommande] = useState<Commande>({
    commande_ref: '',
    commande_date: new Date().toISOString(),
    nombre_personne: 1,
    menu_id: menu_id,
    utilisateur_id: utilisateur.utilisateur_id ?? -1,
    commande_presta: {
      prestation_date: '',
      prestation_heure: '',
      prestation_adresse: {} as any,
      livraison_prix: 0,
      pret_materiel: false,
      restitution_materiel: false,
    },
    commande_status: 'Création',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/connect', { state: { from: `/commande/${menu_id}` } });
      return;
    }
    // 1. Premier appel : Sécurité + récupération de l'ID utilisateur via l'API commande
    fetch('http://localhost:8000/api/commande.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/connect';
          throw new Error('Non autorisé');
        }
        return response.json();
      })
      .then((data) => {
        const userId = data.id;

        return fetch(`http://localhost:8000/api/utilisateur.php?id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((userData) => {
        console.log("Informations complètes de l'utilisateur :", userData);

        setUtilisateur({
          utilisateur_id: userData.utilisateur_id,
          email: userData.email,
          prenom: userData.prenom,
          nom: userData.nom,
          telephone: userData.telephone,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) {
    return <p>Chargement de votre espace sécurisé...</p>;
  }

  return (
    <div>
      <h1>Formulaire de commande</h1>
      <p>{utilisateur.nom}</p>
      <form></form>
    </div>
  );
}
