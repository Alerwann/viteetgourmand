<?php

namespace App\Enum;

enum StatusAvis: string
{
    case Cree = 'créé';
    case Refuse = 'refusé';
    case Publie = 'publié';
}
