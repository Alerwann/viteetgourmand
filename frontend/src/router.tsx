/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Accueil_coposant from "./composant/accueil/Accueil";
import DashboardLayout from "./composant/dashboard/DashboardLayout";
import Contact_composant from "./composant/contact/contact";

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
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
