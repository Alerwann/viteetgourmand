/** @format */

import { useEffect, useState, type SubmitEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Commande } from '../../interfaces/commande';
import { type utilisateurAuth } from '../../interfaces/utilisateur';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import FormIdentity from './FormIdentity';
import FormMenuCommmande from './FormMenuCommande';
import type { MenuDetail } from '../../interfaces/menus';
import Loading from '../global/styles/loading/Loading';

export default function FormCommande() {
  const { menuid } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const menu_id = menuid ? parseInt(menuid) : -1;

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [allMenus, setAllMenus] = useState<MenuDetail[]>([]);
  // const [namesMenu, setNamesMenu] = useState<String[]>([]);
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
    document.title = 'Commande Vite & Gourmand';
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/connect', { state: { from: `/commande/${menu_id}` } });
      return;
    }

    console.log(`${allMenus} `);

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

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/menus.php')
      .then((res) => res.json())
      .then((data) => setAllMenus(data))
      .catch((err) => console.error('Erreur fetch menus:', err));
    setLoading(false);
  }, []);

  const handleChange = () => {};
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Tu soummets');
    setcommande({
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
  };

  const handlePageChange = () => {
    if (pageIndex < 2) {
      const indexAct = pageIndex;
      setPageIndex(indexAct + 1);
    }
  };

  const handleBackPage = () => {
    if (pageIndex > 0) {
      const indexAct = pageIndex;
      setPageIndex(indexAct - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <FormStyle onSubmit={handleSubmit}>
        {pageIndex === 0 && (
          <FormIdentity
            adresse_postale={commande.commande_presta.prestation_adresse}
            utilisateur={utilisateur}
            handleChange={handleChange}
          />
        )}

        {pageIndex == 1 && <FormMenuCommmande />}
      </FormStyle>
      <div className="mb-8 w-full flex justify-center gap-10">
        <button
          type="button"
          onClick={handleBackPage}
          disabled={pageIndex == 0}
          className="p-5 rounded-2xl bg-amber-100 border-2 border-red-500 disabled:bg-gray-200 disabled:border-gray-500 disabled:text-gray-400"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={handlePageChange}
          disabled={pageIndex == 2}
          className="p-5 rounded-2xl bg-amber-100 border-2 border-green-500 disabled:bg-gray-200 disabled:border-gray-500 disabled:text-gray-400"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
