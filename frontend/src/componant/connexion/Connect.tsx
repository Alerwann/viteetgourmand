/** @format */

import CustomButton from '../global/styles/button_global';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { IdentConnexion } from '../../interfaces/identConnexion';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Connect_composant() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const [identConnexion, setIdentConnexion] = useState<IdentConnexion>({
    email: '',
    password: '',
  });

  const [showError, setShowError] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onClikPass = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = 'Connexion | Vite & Gourmand';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentConnexion({ ...identConnexion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const preload = {
      email: identConnexion.email,
      password: identConnexion.password,
    };

    try {
      const response = await api.post('api/auth.php', preload);
      setShowError(false);
      const { token, user } = response.data;

      // Note : Assure-toi que ton endpoint PHP 'api/auth.php' renvoie
      // à la fois { token: "...", user: { id, email, role, ... } }

      // 3. Met à jour le Context React ET le localStorage en même temps
      login(token, user);

      const redirectTo =
        location.state?.from?.pathname ?? // .pathname pour être sûr d'avoir l'URL propre
        sessionStorage.getItem('redirect_after_login') ??
        '/';

      sessionStorage.removeItem('redirect_after_login');

      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      console.error('Erreur lors de la soumission :', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 401) {
          setShowError(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FormStyle title="Connexion" onSubmit={handleSubmit}>
      <FieldsetStyle legend="Vos identifiants">
        <InputStyle
          label="Email"
          type="email"
          name="email"
          id="email"
          value={identConnexion.email}
          onChange={handleChange}
          required
        />

        <InputStyle
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          value={identConnexion.password}
          onChange={handleChange}
          required
          rightIcon={
            <button
              type="button"
              onClick={onClikPass}
              className="text-[#888888] hover:text-[#2C2C2C] transition-colors"
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          }
        />
      </FieldsetStyle>

      {showError && (
        <p className="text-[#D95D39] text-sm font-medium bg-amber-50 p-3 rounded-xl border border-amber-200 w-full text-center">
          Mail ou mot de passe incorrect.
        </p>
      )}

      <CustomButton label="Se connecter" type="submit" />

      <div className="flex flex-col sm:flex-row justify-between w-full text-sm text-[#666666] pt-2 gap-2">
        <a href="/reinit" className="hover:text-[#D95D39] transition-colors">
          Mot de passe oublié ?
        </a>
        <a
          href="/createcompte"
          className="hover:text-[#D95D39] transition-colors font-medium"
        >
          Créer un compte
        </a>
      </div>
    </FormStyle>
  );
}
