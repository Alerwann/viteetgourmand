/** @format */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initCommande, type Commande } from '../../interfaces/commande';
import type { utilisateurAuth } from '../../interfaces/utilisateur';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import FormIdentity from './FormIdentity';
import FormMenuCommmande from './FormMenuCommande';
import type { MenuDetail } from '../../interfaces/menus';
import Loading from '../global/loading/Loading';
import {
  getShippingForAddress,
  type ShippingResult,
} from '../../utils/distance_calcul';
import CustomButton from '../global/styles/button_global';
import VerifCommande from './VerifCommande';
import createREfCommande from '../../utils/create_ref_commande';
import TitleCommandeSection from '../global/styles/title_commande_section';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext'; // <--- 1. Importe le useAuth

export default function FormCommande() {
  const { menuid } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth(); // <--- 2. Récupère l'utilisateur du context

  const menu_id = menuid ? parseInt(menuid) : -1;
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [menuChoose, setMenuChoose] = useState<MenuDetail>();
  const [loadingMenu, setLoadingMenu] = useState<boolean>(true);

  const [utilisateur, setUtilisateur] = useState<utilisateurAuth>({
    utilisateur_id: 0,
    email: '',
    prenom: '',
    nom: '',
    telephone: '',
  });

  const initialeCommande = initCommande(
    menuChoose?.nb_perso_min,
    menu_id,
    utilisateur.utilisateur_id,
  );

  const [commande, setcommande] = useState<Commande>(initialeCommande);
  const [resultGetCoord, setResulGetCoor] = useState<ShippingResult>({
    fraisDePort: 0,
    distanceKm: 0,
  });

  useEffect(() => {
    document.title = 'Commande | Vite & Gourmand';
  }, []);

  // 3. Synchronise l'utilisateur du context vers l'état local du formulaire
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/connect', { replace: true });
      return;
    }

    if (user) {
      setUtilisateur({
        utilisateur_id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
        telephone: user.telephone || '',
      });
    }
  }, [user, isAuthenticated, authLoading, navigate]);

  // 4. Fetch du menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get(`api/menus.php?id=${menu_id}`);
        const menuData = response.data;

        setMenuChoose({
          menu_nom: menuData['menu_nom'],
          menu_prix: menuData['menu_prix'],
          nb_perso_min: menuData['nb_perso_min'],
          description: menuData['descritption'],
          quantite_restante: menuData['quantite_restante'],
          regime_id: menuData['regimeId'],
          regime_nom: menuData['regime_nom'],
          theme_nom: menuData['theme_nom'],
          theme_id: menuData['theme_id'],
          plats_details: menuData['plats_details']
            ? menuData['plats_details']
            : [],
        });

        setcommande((prev) => ({
          ...prev,
          nombre_personne: menuData['nb_perso_min'],
        }));
      } catch (err: any) {
        console.error('Erreur fetch menu:', err);
      } finally {
        setLoadingMenu(false);
      }
    };

    if (menu_id !== -1) {
      fetchMenu();
    }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resultGetCoord = await getShippingForAddress(
        commande.commande_presta.prestation_adresse,
      );

      const commandeREf = createREfCommande(
        utilisateur.utilisateur_id!,
        menu_id,
      );

      const playLoad = {
        commande_ref: commandeREf,
        nombre_personne: commande.nombre_personne,
        menu_id: menu_id,
        utilisateur_id: utilisateur.utilisateur_id ?? -1,
        commande_presta: {
          prestation_date: commande.commande_presta.prestation_date,
          prestation_heure: commande.commande_presta.prestation_heure,
          prestation_adresse: commande.commande_presta.prestation_adresse,
          livraison_prix: resultGetCoord.fraisDePort,
          pret_materiel: false,
          restitution_materiel: false,
        },
        commande_status: 'accepte',
      };

      const response = await api.post('api/commande.php', playLoad);

      console.log('Commande passée avec succès :', response.data);
      alert('Commande créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    }
  };

  const handlePageChange = async () => {
    if (pageIndex === 0) {
      if (
        commande.commande_presta.prestation_adresse.street === '' ||
        commande.commande_presta.prestation_adresse.code_postal === 0 ||
        commande.commande_presta.prestation_adresse.ville === ''
      ) {
        alert('Adresse incomplète');
        return;
      } else {
        const GetCoord = await getShippingForAddress(
          commande.commande_presta.prestation_adresse,
        );
        if (GetCoord !== undefined) {
          setResulGetCoor(GetCoord);
        }
      }
    }
    if (pageIndex < 2) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handleBackPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  if (authLoading || loadingMenu) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-6">
      <FormStyle onSubmit={handleSubmit}>
        {pageIndex === 0 && (
          <div className="w-full">
            <TitleCommandeSection title="Étape 1/3 : Identité et adresse de livraison" />
            <FormIdentity
              utilisateur={utilisateur}
              handleChange={handleChange}
              commande={commande}
            />
          </div>
        )}

        {pageIndex === 1 && (
          <div className="w-full">
            <TitleCommandeSection title="Étape 2/3 : La commande" />
            <FormMenuCommmande
              menuData={menuChoose!}
              handleChange={handleChange}
              commande={commande}
            />
          </div>
        )}

        {pageIndex === 2 && (
          <div className="w-full">
            <TitleCommandeSection title="Étape 3/3 : Vérification et validation pour calcul du prix" />
            <VerifCommande
              commande={commande}
              menuData={menuChoose!}
              coutLivraison={resultGetCoord!.fraisDePort}
            />
          </div>
        )}

        {pageIndex === 2 && (
          <div className="flex flex-col gap-6 w-full mt-4">
            {testPrestaKo && (
              <p className="text-base font-medium text-center text-[#D95D39] bg-amber-50 p-4 rounded-xl border border-amber-200">
                Tous les champs ne sont pas remplis. Merci de modifier votre
                commande.
              </p>
            )}
            <div className="w-full flex justify-center items-center gap-6">
              <CustomButton
                label="Retour"
                type="button"
                onClick={handleBackPage}
              />
              <CustomButton
                label="Valider et commander"
                type="submit"
                disabled={testPrestaKo}
              />
            </div>
          </div>
        )}
      </FormStyle>

      {pageIndex < 2 && (
        <div className="w-full max-w-2xl mx-auto flex justify-center items-center gap-6 px-6 mt-6">
          <CustomButton
            label="Retour"
            type="button"
            onClick={handleBackPage}
            disabled={pageIndex === 0}
          />
          <CustomButton
            label="Continuer"
            type="button"
            onClick={handlePageChange}
            disabled={pageIndex === 2}
          />
        </div>
      )}
    </div>
  );
}
