/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Accueil_coposant from "./composant/accueil/Accueil";
import DashboardLayout from "./composant/dashboard/DashboardLayout";
import Contact_composant from "./composant/contact/contact";
import Menus_composant from "./composant/Menus/Menus";
import MenuDetail from "./composant/Menus/Menu_detail";
import Connect_composant from "./composant/connexion/Connect";
import CreateCompte from "./composant/connexion/CreateCompte";
import ReinitPassword from "./composant/connexion/ReinitPassword";
import FormReinit from "./composant/connexion/FormReinit";
import FormCommande from "./composant/commande/FormCommande";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // all
      {
        index: true,
        element: <Accueil_coposant />,
      },
      // admin et employe
      {
        path: "dashboard",

        element: <DashboardLayout />,
      },
      //all
      {
        path: "contact",
        element: <Contact_composant />,
      },
      // all
      {
        path: "menus",
        element: <Menus_composant />,
      },
      // all
      { path: "menus/:id", element: <MenuDetail /> },

      // all
      { path: "connect", element: <Connect_composant /> },
      { path: "createcompte", element: <CreateCompte /> },

      { path: "reinit", element: <ReinitPassword /> },

      { path: "reinit/:token", element: <FormReinit /> },

      { path: "commande", element: <FormCommande /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
