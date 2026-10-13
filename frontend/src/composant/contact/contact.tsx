/** @format */
import { useState } from "react";
import CustomButton from "../global/button_global";

interface ContactFormData {
  title: string;
  description: string;
  email: string;
}

export default function Contact_composant() {
  const [formData, setFormData] = useState<ContactFormData>({
    title: "",
    description: "",
    email: "",
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
        "http://localhost:8000/api/contact_request.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setStatus("Message envoyé avec succès !");
      setFormData({ title: "", description: "", email: "" });
    } catch (err) {
      setStatus("Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 sm:p-10">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Besoin d'informations supplémentaires ?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Nous répondrons à votre formulaire dans les plus brefs délais !
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Objet */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Objet
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Sujet de votre demande"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Votre email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="votre.email@exemple.com"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              maxLength={250}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Votre message (250 caractères max)"
            />
            <div className="mt-1 text-right text-xs text-slate-400">
              {formData.description.length} / 250 caractères
            </div>
          </div>

          {/* Bouton de validation & Statut */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <CustomButton label="Envoyer le message" type="submit" />

            {status && (
              <p
                className={`text-sm font-medium ${status.includes("succès") ? "text-emerald-600" : "text-rose-600"}`}
              >
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
