/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Accueil_coposant from "./composant/Accueil";
import DashboardLayout from "./DashboardLayout";

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
  {
    path: "dashboard",
    element: <DashboardLayout />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
