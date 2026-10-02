/** @format */

import Header_composant from "./composant/header/Header";
import Footer_composant from "./composant/footer/Footer";
import Horaires from "./composant/dashboard/Horaire";

export default function DashboardLayout() {
  return (
    <>
      <Header_composant />
      <main className="flex flex-col bg-[rgba(255,230,197,1)] h-screen">
        <Horaires />
      </main>
      <Footer_composant />
    </>
  );
}
