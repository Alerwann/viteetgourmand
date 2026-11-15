/** @format */

export interface Avis {
  avis_id: number;
  description: string;
  status: string;
  note: number;
  created_at?: string;
  commande_ref?: string;
}

export interface StatusAvis {
  'créé': string;
  'refusé': string;
  'publié': string;
}

export const StatusAvis = ['créé', 'refusé', 'publié'] as const;
