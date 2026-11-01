/** @format */
import { useState } from 'react';
import CustomButton from '../global/styles/button_global';
import FormStyle from '../global/styles/Formulaire/FormStyle';
import { InputStyle } from '../global/styles/Formulaire/InputStyle';
import { FieldsetStyle } from '../global/styles/Formulaire/FieldsetStyle';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:8000/api/contact_request.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setStatus('Message envoyé avec succès !');
      setFormData({ title: '', description: '', email: '' });
    } catch (err) {
      setStatus('Une erreur est survenue.');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Besoin d'informations supplémentaires ?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Nous répondrons à votre formulaire dans les plus brefs délais !
          </p>
        </div>

        <FormStyle onSubmit={handleSubmit}>
          <FieldsetStyle legend="Contact">
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

            <label className="">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              maxLength={250}
              className="w-full bg-white border-2 p-2 rounded-md pr-10 focus:outline-2 focus:outline-indigo-600  resize-none"
              placeholder="Votre message (250 caractères max)"
            />
            <div className="mt-1 text-right text-xs text-slate-400">
              {formData.description.length} / 250 caractères
            </div>
          </FieldsetStyle>

          <div className="flex flex-col items-center gap-4 pt-4">
            <CustomButton label="Envoyer le message" type="submit" />

            {status && (
              <p
                className={`text-sm font-medium ${status.includes('succès') ? 'text-emerald-600' : 'text-rose-600'}`}
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
