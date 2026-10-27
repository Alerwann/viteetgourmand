<?php

namespace App\Enum;

enum StatusAvis: string
{
    case Cree = 'cree';
    case refuse = 'non_valide';
    case Publie = 'publie';
}
