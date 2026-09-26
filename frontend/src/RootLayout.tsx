/** @format */

import { Outlet } from "react-router-dom";
import Header_composant from "./composant/Header";
import Footer_composant from "./composant/Footer";

export default function RootLayout() {
  return (
    <>
      <Header_composant />
      <main className="flex flex-col bg-[rgba(255,230,197,1)] h-screen">
        <Outlet />
      </main>
      <Footer_composant />
    </>
  );
}
