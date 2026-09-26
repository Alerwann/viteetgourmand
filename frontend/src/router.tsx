/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Accueil_coposant from "./composant/Accueil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Accueil_coposant />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
