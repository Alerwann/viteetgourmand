/** @format */

import type { adressePostale } from '../interfaces/utilisateur';

interface Coordinates {
  lat: number;
  lng: number;
}

// interface HereGeocodeResponse {
//   items: Array<{
//     position: {
//       lat: number;
//       lng: number;
//     };
//   }>;
// }

interface ShippingResult {
  distanceKm: number;
  fraisDePort: number;
}

export async function getCoordinatesFromAddress(
  adresse: adressePostale,
): Promise<Coordinates> {
  const apiKey = import.meta.env.VITE_API_HERE_KEY;

  if (!apiKey) {
    throw new Error(
      "La clé API HERE est manquante dans les variables d'environnement.",
    );
  }

  // Construction d'une chaîne d'adresse propre
  const numero = adresse.numero_rue ? `${adresse.numero_rue} ` : '';
  const adresseComplete = `${numero}${adresse.street}, ${adresse.code_postal} ${adresse.ville}, ${adresse.pays}`;

  // On utilise le paramètre 'q' obligatoire
  const params = new URLSearchParams({
    apiKey: apiKey,
    q: adresseComplete,
  });

  const url = `https://geocode.search.hereapi.com/v1/geocode?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erreur API HERE (${response.status}): ${errorData.title || 'Inconnue'}`,
    );
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('Aucune coordonnée trouvée pour cette adresse.');
  }

  const { lat, lng } = data.items[0].position;
  return { lat, lng };
}

export async function calculateShippingCost(
  clientLat: number,
  clientLng: number,
): Promise<ShippingResult> {
  const apiKey = import.meta.env.VITE_API_HERE_KEY;

  if (!apiKey) {
    throw new Error('La clé API HERE est manquante.');
  }

  // Coordonnées fixes de Bordeaux
  const origin = '44.8378,-0.5792';
  const destination = `${clientLat},${clientLng}`;

  const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&return=summary&apiKey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erreur Routing (${response.status}): ${errorData.title || 'Inconnue'}`,
    );
  }

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error('Aucun itinéraire trouvé.');
  }

  const distanceKm = data.routes[0].sections[0].summary.length / 1000;

  let fraisDePort = 0;
  fraisDePort = 5 + (Math.round(distanceKm * 10) / 10) * 0.59;

  return {
    distanceKm: Math.round(distanceKm * 10) / 10,
    fraisDePort: parseFloat(fraisDePort.toFixed(2)),
  };
}

export async function getShippingForAddress(
  adresse: adressePostale,
): Promise<ShippingResult> {
  let resultShipping = { distanceKm: 0, fraisDePort: 5 };

  if (
    adresse.ville.toLowerCase() !== 'bordeaux' ||
    adresse.code_postal === 33000
  ) {
    const coords = await getCoordinatesFromAddress(adresse);
    resultShipping = await calculateShippingCost(coords.lat, coords.lng);
  }
  console.log(resultShipping);
  return resultShipping;
}
