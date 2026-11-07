/** @format */

import { Outlet } from 'react-router-dom';
import Header_composant from './componant/header/Header';
import Footer_composant from './componant/footer/Footer';

export default function RootLayout() {
  return (
    <>
      <Header_composant />
      <main className="flex flex-col bg-[#FDFBF7]   ">
        <Outlet />
      </main>
      <Footer_composant />
    </>
  );
}
