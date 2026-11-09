/** @format */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // À garder uniquement si PHP a besoin de recevoir des cookies (CORS)
  withCredentials: true,
});

// 1. Intercepteur de requête : Ajout du token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Intercepteur de réponse : Gestion centralisée du 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nettoyage
      localStorage.removeItem('token');

      // Alternative propre au window.location :
      // Redirection via React Router si géré globalement, ou événement personnalisé
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  },
);

export default api;
