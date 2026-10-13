/** @format */

import Horaires from "./Horaire";
import MenuCreateForm from "./Menu_Create_Form";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col bg-[rgba(255,230,197,1)] h-screen">
      <Horaires />
      <MenuCreateForm />
    </div>
  );
}
