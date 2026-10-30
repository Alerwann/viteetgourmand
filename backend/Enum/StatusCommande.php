<?php

namespace App\Enum;

enum StatusCommande: string
{
    case Accepte = 'accepte';
    case Preparation = 'preparation';
    case Livraison = 'livraison';
    case Livre = 'livre';
    case AttenteMateriel = 'attente_materiel';
    case Termine = 'ternmine';
}
