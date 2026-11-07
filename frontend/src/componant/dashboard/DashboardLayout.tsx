/** @format */

import CustomButton from '../global/styles/button_global';
import DashboardStats from './DashBoardStat';
import MenuCreateForm from './Menu_Create_Form';
import PlatCreateForm from './Plat_Create_Form';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col justify-center items-center text-[#2C2C2C]  min-h-[60vh] gap-8">
      <h2>Liste de vos actions possibles</h2>
      <CustomButton label="Modifier les horaires" to="/modifHoraire" />
      <CustomButton label="Ajouter un plat" to="/creatPlat" />
      <CustomButton label="Créer un nouveau menu" to="/creatMenu" />
      <CustomButton label="Accéder aux statistiques" to="/resultDashboard" />
    </div>
  );
}
