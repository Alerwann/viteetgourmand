/** @format */

import CustomButton from '../global/styles/button_global';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col justify-center items-center text-[#2C2C2C]  min-h-[60vh] gap-8">
      <h2>Liste de vos actions possibles</h2>
      <div className="grid grid-cols-3 w-full m-5 text-center ">
        <div className="flex flex-col gap-4 px-8">
          <h3>Gestion des menus</h3>
          <CustomButton label="Gestion des plats" to="/creatPlat" />
          <CustomButton label="Créer un nouveau menu" to="/creatMenu" />
        </div>
        <div className="flex flex-col gap-4 px-8">
          <h3>Gestion des commandes</h3>
          <CustomButton label="Ensemble des commandes" to="/Commandes" />
        </div>
        <div className="flex flex-col gap-4 px-8">
          <h3>Gestion Administrateur</h3>
          <CustomButton label="Modifier les horaires" to="/modifHoraire" />
          <CustomButton
            label="Accéder aux statistiques"
            to="/resultDashboard"
          />
          <CustomButton label="Gestion des employés" to="/GestionEmploye" />
        </div>
      </div>
    </div>
  );
}
