/** @format */
import { useState } from "react";
import CustomButton from "../global/button_global";

interface ContactFormData {
  title: string;
  description: string;
  email: string;
}

const inputDiv = "grid grid-cols-[1fr_3fr]  px-5  text-center items-center ";
const inputForm = "bg-amber-100 p-2 border-1";

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
    <div className="h-screen ">
      <div className="text-center mt-5 font-bold text-2xl  ">
        <h2>Besoin d'informations supplémentaires?</h2>
        <p>Nous répondrons à votre formulaire sous les plus bref délais !</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col gap-4 bg-green-50 m-5 py-5 w-5/10">
          <div className={inputDiv}>
            <label>Objet</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputForm}
              placeholder="Sujet"
            />
          </div>
          <div className={inputDiv}>
            <label className="flex-1">Description</label>
            <div className="w-full flex-3 flex flex-col ">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                maxLength={250}
                className={inputForm}
                placeholder="Demande (250 caractère max)"
              />
              <p className="text-xs text-right">
                {formData.description.length} / 250 caractères
              </p>
            </div>
          </div>

          <div className={inputDiv}>
            <label>Votre email </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputForm}
              placeholder="votre.email@perso.com"
            />
          </div>
        </div>
        <div className=" ">
          <CustomButton label="Valider" type="submit" />
        </div>

        {status && <p>{status}</p>}
      </form>
    </div>
  );
}
