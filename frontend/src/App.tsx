/** @format */

import "./App.css";
import Footer_composant from "./composant/Footer";
import Header_Componant from "./composant/Header";

function App() {
  return (
    <div>
      <Header_Componant />
      <main className="flex flex-col bg-[rgba(255,230,197,1)] h-screen">
        <h1>App.cs affichage</h1>
      </main>
      <Footer_composant />
    </div>
  );
}

export default App;
