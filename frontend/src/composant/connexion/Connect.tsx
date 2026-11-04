/** @format */

import CustomButton from '../global/styles/button_global';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { IdentConnexion } from '../../interfaces/identConnexion';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import Loading from '../global/styles/loading/Loading';

export default function Connect_composant() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [identConnexion, setIdentConnexion] = useState<IdentConnexion>({
    email: '',
    password: '',
  });

  const [showError, setShowError] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onClikPass = () => {
    const newStatePass = !showPassword;
    setShowPassword(newStatePass);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentConnexion({ ...identConnexion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const preload = {
      email: identConnexion.email,
      password: identConnexion.password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preload),
      });

      response.status === 401 ? setShowError(true) : setShowError(false);

      if (!response.ok) {
        throw new Error('Erreur HTTP : ' + response.status);
      }
      const data = await response.json();

      const redirectTo = location.state?.from ?? '/';
      localStorage.setItem('token', data.token);
      navigate(redirectTo, { replace: true });
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 mb-4"
      >
        <FieldsetStyle legend="Connexion">
          <InputStyle
            label="Email"
            type="email"
            name="email"
            id="email"
            value={identConnexion.email}
            onChange={handleChange}
          />

          <InputStyle
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={identConnexion.password}
            onChange={handleChange}
            rightIcon={
              <button
                type="button"
                onClick={onClikPass}
                className="text-gray-500 hover:text-gray-700"
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            }
          />
        </FieldsetStyle>
        <CustomButton label="Connexion" type="submit" />
      </form>
      <section className="flex flex-col text-center gap-2 mb-4">
        {showError && (
          <span className="text-red-500 text-lg">
            Mail ou mot de passe incorrect
          </span>
        )}
        <a href="/reinit" className="">
          Mot de passe oublié
        </a>
        <a href="/createcompte">Créer un compte</a>
      </section>
    </div>
  );
}
