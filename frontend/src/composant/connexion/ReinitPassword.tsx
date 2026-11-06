/** @format */
import { useState, useEffect } from 'react';

import CustomButton from '../global/styles/button_global';
import Loading from '../global/loading/Loading';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';

/** @format */
const inputAsset = 'bg-white border-2 p-2';

export default function ReinitPassword() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Reinititialisation mot de passe';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error('Erreur HTTP : ' + response.status);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      setIsLoading(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mx-8 min-h-[60vh] gap-16  flex flex-col justify-center items-center">
      <p className="text-2xl font-medium">
        Un lien vous sera envoyé par email pour réinitialiser votre mot de
        passe.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-16 mb-4"
      >
        <FieldsetStyle legend="Réinitialisation de mot de passe">
          <InputStyle
            label="Votre E-mail"
            type="email"
            className={inputAsset}
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </FieldsetStyle>
        <CustomButton label="Connexion" type="submit" />
      </form>
    </div>
  );
}
