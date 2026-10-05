/** @format */

import Horaires from "./composant/dashboard/Horaire";

export default function DashboardLayout() {
  return (
    <>
      <main className="flex flex-col bg-[rgba(255,230,197,1)] h-screen">
        <Horaires />
      </main>
    </>
  );
}
