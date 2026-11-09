/** @format */

// src/types/auth.ts

export type Role = 'admin' | 'utilisateur' | 'employé' | string;

export interface User {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  telephone: string;
  is_actif: boolean;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  hasRole: (requiredRole: Role | Role[]) => boolean;
}
