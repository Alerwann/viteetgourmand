/** @format */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Accueil_coposant from './componant/accueil/Accueil';
import DashboardLayout from './componant/dashboard/DashboardLayout';
import Contact_composant from './componant/contact/contact';
import Menus_composant from './componant/Menus/Menus';
import MenuDetail from './componant/Menus/Menu_detail';
import Connect_composant from './componant/connexion/Connect';
import CreateCompte from './componant/connexion/CreateCompte';
import ReinitPassword from './componant/connexion/ReinitPassword';
import FormCommande from './componant/commande/FormCommande';
import Horaires from './componant/dashboard/Horaire';
import PlatCreateForm from './componant/dashboard/Plat_Create_Form';
import MenuCreateFor from './componant/dashboard/Menu_Create_Form';
import DashboardStats from './componant/dashboard/DashBoardStat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // all
      {
        index: true,
        element: <Accueil_coposant />,
      },
      // admin et employe
      {
        path: 'dashboard',

        element: <DashboardLayout />,
      },
      //all
      {
        path: 'contact',
        element: <Contact_composant />,
      },
      // all
      {
        path: 'menus',
        element: <Menus_composant />,
      },
      // all
      { path: 'menus/:id', element: <MenuDetail /> },

      // all
      { path: 'connect', element: <Connect_composant /> },
      { path: 'createcompte', element: <CreateCompte /> },

      { path: 'reinit', element: <ReinitPassword /> },

      { path: 'reinit/:token', element: <ReinitPassword /> },

      { path: 'commande/:menuid', element: <FormCommande /> },

      { path: 'modifHoraire/', element: <Horaires /> },
      { path: 'creatPlat/', element: <PlatCreateForm /> },
      { path: 'creatMenu/', element: <MenuCreateFor /> },
      { path: 'resultDashboard/', element: <DashboardStats /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
