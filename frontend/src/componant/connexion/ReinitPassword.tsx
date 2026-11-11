/** @format */

import { useState, useEffect } from 'react';
import CustomButton from '../global/styles/button_global';
import Loading from '../global/loading/Loading';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import api from '../../services/api';

export default function ReinitPassword() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Réinitialisation du mot de passe | Vite & Gourmand';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('api/auth.php', {
        email: email,
      });
      alert(
        'Un email de réinitialisation vous a été envoyé si le compte existe.',
      );
    } catch (error: any) {
      console.error('Erreur lors de la soumission :', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-12 px-4 bg-[#FDFBF7]">
      <div className="max-w-xl text-center mb-6">
        <p className="text-xl font-serif text-[#2C2C2C] leading-relaxed">
          Un lien vous sera envoyé par e-mail pour réinitialiser votre mot de
          passe.
        </p>
        <div className="w-12 h-1 bg-[#D95D39] mx-auto mt-3 rounded-full"></div>
      </div>

      <FormStyle onSubmit={handleSubmit}>
        <FieldsetStyle legend="Réinitialisation">
          <InputStyle
            label="Votre E-mail"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </FieldsetStyle>

        <div className="mt-4">
          <CustomButton label="Envoyer le lien" type="submit" />
        </div>
      </FormStyle>
    </div>
  );
}
