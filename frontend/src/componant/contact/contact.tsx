/** @format */

import { useState, useEffect } from 'react';
import CustomButton from '../global/styles/button_global';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';
import Loading from '../global/loading/Loading';
import api from '../../services/api';

interface ContactFormData {
  title: string;
  description: string;
  email: string;
}

export default function Contact_composant() {
  const [formData, setFormData] = useState<ContactFormData>({
    title: '',
    description: '',
    email: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Contact | Vite & Gourmand';
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('api/contact_request.php', formData);

      setStatus('Message envoyé avec succès !');
      setFormData({ title: '', description: '', email: '' });
    } catch (err: any) {
      setStatus('Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center bg-[#FDFBF7]">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-extrabold text-[#2C2C2C] tracking-tight">
            Besoin d'informations supplémentaires ?
          </h2>
          <p className="mt-2 text-sm text-[#666666] font-sans">
            Nous répondrons à votre formulaire dans les plus brefs délais !
          </p>
          <div className="w-16 h-1 bg-[#D95D39] mx-auto mt-4 rounded-full"></div>
        </div>

        <FormStyle onSubmit={handleSubmit}>
          <FieldsetStyle legend="Formulaire de contact">
            <InputStyle
              label="Objet"
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Sujet de votre demande"
            />

            <InputStyle
              id="email"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre.email@exemple.com"
            />

            <div className="contents">
              <label
                htmlFor="description"
                className="text-sm font-medium text-[#2C2C2C] font-sans"
              >
                Description
              </label>
              <div className="w-full">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={250}
                  className="w-full bg-[#FDFBF7] border border-[#EFECE6] p-3 rounded-xl text-[#2C2C2C] focus:outline-none focus:border-[#D95D39] focus:ring-1 focus:ring-[#D95D39] resize-none transition-all"
                  placeholder="Votre message (250 caractères max)"
                />
                <div className="mt-1 text-right text-xs text-[#888888]">
                  {formData.description.length} / 250 caractères
                </div>
              </div>
            </div>
          </FieldsetStyle>

          <div className="flex flex-col items-center gap-4 pt-4 w-full">
            <CustomButton label="Envoyer le message" type="submit" />

            {status && (
              <p
                className={`text-sm font-medium p-3 rounded-xl border ${
                  status.includes('succès')
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-[#D95D39] bg-amber-50 border-amber-200'
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </FormStyle>
      </div>
    </div>
  );
}
