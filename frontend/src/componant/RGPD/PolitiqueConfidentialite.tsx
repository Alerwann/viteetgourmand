/** @format */
import { useEffect } from 'react';

export default function PolitiqueConfidentialite() {
  useEffect(() => {
    document.title = 'Vite & Gourmand | Politique de confidentialité';
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#FDFBF7] text-[#2C2C2C] min-h-screen py-12 px-4">
      <div className="w-full max-w-4xl space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#EFECE6]">
        <header className="border-b border-[#EFECE6] pb-6">
          <h1 className="text-3xl font-serif font-semibold text-[#2C2C2C] mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-sm text-[#666666]">
            Dernière mise à jour : novembre 2026
          </p>
        </header>

        <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-semibold text-[#2C2C2C]">
            1. Introduction et responsable du traitement
          </h2>
          <p>
            La présente politique de confidentialité s'applique au site de
            commande de l'entreprise fictive <strong>Vite & Gourmand</strong>.
            Elle vous informe sur la manière dont vos données personnelles sont
            collectées, traitées et protégées conformément au Règlement Général
            sur la Protection des Données (RGPD).
          </p>
        </section>

        <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-semibold text-[#2C2C2C]">
            2. Données collectées
          </h2>
          <p>
            Dans le cadre de l'utilisation de notre service, nous sommes amenés
            à collecter les catégories de données suivantes :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail et numéro de téléphone</li>
            <li>Adresse postale et adresse de livraison</li>
            <li>Historique de commandes</li>
            <li>Avis clients déposés sur la plateforme</li>
          </ul>
        </section>

        <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-semibold text-[#2C2C2C]">
            3. Finalités des traitements
          </h2>
          <p>
            Vos données personnelles sont collectées pour des finalités précises
            et légitimes :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gestion des commandes et suivi de la livraison</li>
            <li>Fourniture du service client</li>
            <li>Suivi commercial et gestion des avis</li>
          </ul>
        </section>

        <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-semibold text-[#2C2C2C]">
            4. Destinataires et hébergement des données
          </h2>
          <p>
            L'accès à vos données personnelles est strictement limité à l'équipe
            interne de l'entreprise <strong>Vite & Gourmand</strong>.
          </p>
          <p>
            Le site est hébergé par <strong>Vercel</strong>, et les données sont
            stockées sur les bases de données gérées via <strong>TIDB</strong>{' '}
            et <strong>Render</strong>.
          </p>
        </section>

        <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-semibold text-[#2C2C2C]">
            5. Durée de conservation
          </h2>
          <p>
            Vos données sont conservées uniquement le temps nécessaire aux
            finalités pour lesquelles elles ont été collectées. Par exemple, les
            factures et données comptables sont conservées pendant une durée
            légale de <strong>5 ans</strong>.
          </p>
        </section>

        <section className="space-y-4 font-sans text-sm md:text-base leading-relaxed">
          <h2 className="text-xl font-serif font-semibold text-[#2C2C2C]">
            6. Vos droits (RGPD)
          </h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification, de suppression, de limitation du traitement, ainsi
            que d'un droit à la portabilité de vos données.
          </p>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter directement via
            les canaux habituels du service client de Vite & Gourmand.
          </p>
        </section>
      </div>
    </div>
  );
}
