/** @format */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Commande } from '../../interfaces/commande';
import { type utilisateurAuth } from '../../interfaces/utilisateur';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import FormIdentity from './FormIdentity';
import FormMenuCommmande from './FormMenuCommande';
import type { MenuDetail } from '../../interfaces/menus';
import Loading from '../global/styles/loading/Loading';
import { getShippingForAddress } from '../../utils/distance_calcul';
import CustomButton from '../global/styles/button_global';
import VerifCommande from './VerifCommande';

export default function FormCommande() {
  const { menuid } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const menu_id = menuid ? parseInt(menuid) : -1;

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [allMenus, setAllMenus] = useState<MenuDetail[]>([]);
  const [menuChoose, setMenuChoose] = useState<MenuDetail>();
  const [utilisateur, setUtilisateur] = useState<utilisateurAuth>({
    utilisateur_id: -1,
    email: '',
    prenom: '',
    nom: '',
    telephone: '',
  });
  const adresse_postale = {
    numero_rue: 0,
    street: '',
    ville: '',
    code_postal: 0,
    pays: 'France',
  };

  const [commande, setcommande] = useState<Commande>({
    commande_ref: '',
    commande_date: new Date().toISOString(),
    nombre_personne: menuChoose?.nb_perso_min ?? 0,
    menu_id: menu_id,
    utilisateur_id: utilisateur.utilisateur_id ?? -1,
    commande_presta: {
      prestation_date: '',
      prestation_heure: '',
      prestation_adresse: adresse_postale,
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

    Promise.all([
      fetch('http://localhost:8000/api/menus.php').then((res) => res.json()),
      fetch(`http://localhost:8000/api/menus.php?id=${menu_id}`).then((res) =>
        res.json(),
      ),
    ])
      .then(([menusData, menuData]) => {
        setAllMenus(menusData);
        setMenuChoose({
          menu_nom: menuData['menu_nom'],
          menu_prix: menuData['menu_prix'],
          nb_perso_min: menuData['nb_perso_min'],
          description: menuData['descritption'],
          quantite_restante: menuData['quantite_restante'],
          regime_nom: menuData['regime_nom'],
          theme_nom: menuData['theme_nom'],
          plats_details: menuData['plat_detail'] ? menuData['plat_detail'] : [],
        });

        setcommande((prev) => ({
          ...prev,
          nombre_personne: menuData['nb_perso_min'],
        }));
      })
      .catch((err) => console.error('Erreur fetch:', err))
      .finally(() => setLoading(false));
  }, [menu_id]);

  const testPrestaKo =
    commande.commande_presta.prestation_date === '' ||
    commande.commande_presta.prestation_heure === '' ||
    commande.commande_presta.prestation_adresse.street === '' ||
    commande.commande_presta.prestation_adresse.ville === '' ||
    commande.commande_presta.prestation_adresse.code_postal === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const adresseFields = [
      'numero_rue',
      'street',
      'ville',
      'code_postal',
      'pays',
    ];
    const prestaField = ['prestation_heure', 'prestation_date'];

    if (adresseFields.includes(name)) {
      setcommande((prev) => ({
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
      }));
    } else if (prestaField.includes(name)) {
      setcommande((prev) => ({
        ...prev,
        commande_presta: {
          ...prev.commande_presta,
          [name]: value,
        },
      }));
    } else {
      setcommande((prev) => ({
        ...prev,
        [name]: ['nombre_personne'].includes(name) ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resultGetCoord = getShippingForAddress(adresse_postale);
      console.log(resultGetCoord);
    } catch (error) {}

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
          <div>
            <h2>Étape 1/3 : Identité et adresse de livraison</h2>
            <FormIdentity
              utilisateur={utilisateur}
              handleChange={handleChange}
              commande={commande}
            />
          </div>
        )}

        {pageIndex == 1 && (
          // cette étape peut être amélioré en ajoutant un possible commantaire

          <div>
            <h2>Étape 2/3 : La commande</h2>
            <FormMenuCommmande
              menuData={menuChoose!}
              handleChange={handleChange}
              commande={commande}
            />
          </div>
        )}

        {pageIndex === 2 && (
          <>
            <h2>Étape 3/3 : Vérification et validation pour calcul du prix</h2>
            <VerifCommande commande={commande} menuData={menuChoose!} />
          </>
        )}

        {pageIndex === 2 && (
          <div className="flex flex-col gap-8">
            {testPrestaKo && (
              <p className="text-xl font-bold text-center">
                Tous les champs ne sont pas remplis. Merci de modifier votre
                commande
              </p>
            )}
            <div className="mb-8 w-full flex justify-center gap-10">
              <button
                type="button"
                onClick={handleBackPage}
                className="p-5 rounded-2xl bg-amber-100 border-2 border-red-500 disabled:bg-gray-200 disabled:border-gray-500 disabled:text-gray-400"
              >
                Retour
              </button>
              <CustomButton
                label="Calculer le prix"
                type="submit"
                disabled={testPrestaKo}
              />
            </div>
          </div>
        )}
      </FormStyle>
      {pageIndex < 2 && (
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
      )}
    </div>
  );
}
