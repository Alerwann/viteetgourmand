/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Accueil_coposant from "./composant/accueil/Accueil";
import DashboardLayout from "./composant/dashboard/DashboardLayout";
import Contact_composant from "./composant/contact/contact";
import Menus_composant from "./composant/Menus/Menus";
import MenuDetail from "./composant/Menus/Menu_detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Accueil_coposant />,
      },

      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
      {
        path: "contact",
        element: <Contact_composant />,
      },
      {
        path: "menus",
        element: <Menus_composant />,
      },
      { path: "menus/:id", element: <MenuDetail /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
