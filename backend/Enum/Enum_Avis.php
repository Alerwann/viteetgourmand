<?php

namespace App\Enum;

enum StatusAvis: string
{
    case Cree = 'cree';
    case Refuse = 'non_valide';
    case Publie = 'publie';
}
