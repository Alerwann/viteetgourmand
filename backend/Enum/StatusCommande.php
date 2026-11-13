<?php

namespace App\Enum;

enum StatusCommande: string
{
    case Valide = 'validée';
    case Accepte = 'acceptée';
    case Preparation = 'en preparation';
    case Livraison = 'en cours de livraison';
    case Livre = 'livrée';
    case AttenteMateriel = 'en attente de retour de matériel';
    case Termine = 'terminée';
}
