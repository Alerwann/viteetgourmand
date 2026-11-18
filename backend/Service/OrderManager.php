<?php

namespace App\Services;

use App\Entity\Commande;
use App\Entity\commandewithmodif;
use App\Entity\ModifCommande;
use App\Repository\Commande\CommandeRepositoryInterface;
use App\Repository\ModifCommande\ModifCommandeRepositoryInterface;


class OrderManager
{
    private CommandeRepositoryInterface $commandeRepo;
    private ModifCommandeRepositoryInterface $modifRepo;

    public function __construct(
        CommandeRepositoryInterface $commandeRepo,
        ModifCommandeRepositoryInterface $modifRepo
    ) {
        $this->commandeRepo = $commandeRepo;
        $this->modifRepo = $modifRepo;
    }

    public function saveOrder(Commande $commande, ?string $modifDescription = null, ?string $modifContact = null): void
    {

        $this->commandeRepo->save($commande);

        if ($commande->getCommandeId() !== \null && $modifDescription !== \null) {
            $modif = new ModifCommande(
                modif_contact: $modifContact ?? 'Système',
                modif_description: $modifDescription,
                commande_id: $commande->getCommandeId(),
                modif_id: \null,
                modif_date: \null
            );

            $this->modifRepo->save($modif);
        }
    }

    public function getOneWithModif(int $commandeId, string $modif = 'false'): CommandeWithModif
    {
        $commande = $this->commandeRepo->getOne($commandeId);

        if ($modif) {
            $modif = $this->modifRepo->getByCommandeId($commandeId);
        }

        $commandeWithModif = new commandewithmodif(
            commande: $commande,
            modifs: $modif
        );
        return $commandeWithModif;
    }
}
