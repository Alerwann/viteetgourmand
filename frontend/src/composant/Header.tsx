/** @format */
import logo from "../assets/logo.webp";

export default function Header_Componant() {
  return (
    <header className="flex-3 p-5 flex flex-col bg-[RGBA(105,230,140,1)] gap-2">
      <div className="flex flex-col md:flex-row items-center content-center gap-2">
        <img
          src={logo}
          alt="logo de l'entreprise vite et gourmand"
          width={200}
          height={100}
          className="rounded-full"
        />
        <h1 className="flex-5 text-center text-2xl font-marmelad">
          Vite & Gourmand
        </h1>
      </div>
      <div>ICI sera le composant navigation</div>
    </header>
  );
}
