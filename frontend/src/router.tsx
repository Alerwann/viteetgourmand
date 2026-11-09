/** @format */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './componant/protectedroute';
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
import Unauthorized from './componant/global/UnAuthorizen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // 1. Routes publiques
      { index: true, element: <Accueil_coposant /> },
      { path: 'contact', element: <Contact_composant /> },
      { path: 'menus', element: <Menus_composant /> },
      { path: 'menus/:id', element: <MenuDetail /> },
      { path: 'connect', element: <Connect_composant /> },
      { path: 'createcompte', element: <CreateCompte /> },
      { path: 'reinit', element: <ReinitPassword /> },
      { path: 'reinit/:token', element: <ReinitPassword /> },
      { path: 'unauthorized', element: <Unauthorized /> },
      // 2. Uniquement si connecté (pas de rôle spécifique requis)
      {
        path: 'commande/:menuid',
        element: (
          <ProtectedRoute>
            <FormCommande />
          </ProtectedRoute>
        ),
      },

      // 3. Réservé aux administrateurs ('admin')
      {
        path: 'modifHoraire/',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Horaires />
          </ProtectedRoute>
        ),
      },
      {
        path: 'resultDashboard/',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardStats />
          </ProtectedRoute>
        ),
      },

      // 4. Réservé aux administrateurs et employés ('admin', 'employé')
      {
        path: 'creatPlat/',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'employé']}>
            <PlatCreateForm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'creatMenu/',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'employé']}>
            <MenuCreateFor />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'employé']}>
            <DashboardLayout />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
