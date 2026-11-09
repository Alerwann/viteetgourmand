/** @format */

import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import CustomButton from '../global/styles/button_global';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-amber-100 text-center flex flex-col items-center gap-4">
        {/* Icône de cadenas */}
        <div className="w-16 h-16 bg-amber-50 text-[#D95D39] flex items-center justify-center rounded-full text-2xl mb-2">
          <FaLock />
        </div>

        <h1 className="text-2xl font-bold text-[#2C2C2C]">Accès refusé</h1>

        <p className="text-[#666666] text-sm leading-relaxed">
          Oups ! Vous n'avez pas les rôles ou les autorisations nécessaires pour
          accéder à cette page.
        </p>

        {/* Bouton de redirection */}
        <div className="w-full mt-4 flex justify-center">
          <CustomButton
            label="Retour à l'accueil"
            type="button"
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
}
