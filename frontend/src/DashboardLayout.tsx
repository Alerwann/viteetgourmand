/** @format */

import Header_composant from "./composant/Header";
import Footer_composant from "./composant/Footer";
import Horaires from "./composant/Horaire";

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
