<?php

namespace App\Repository\ModifCommande;

use App\Entity\ModifCommande;
use App\Repository\ModifCommande\ModifCommandeRepositoryInterface;
use Override;
use PDO;
use PDOStatement;

class SqlModifCommandeRepository implements ModifCommandeRepositoryInterface
{
    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function getAll(): array
    {
        $sql = "SELECT mc.modif_id ,
        mc.modif_contact, 
        mc.modif_description ,
        mc.commande_id , 
        mc.modif_date,
        c.utilisateur_id as utilisateur_id
        FROM modif_commande mc
        JOIN commande c ON mc.commande_id=c.commande_id";

        $stmt = $this->pdo->query($sql);
        return $this->hydrateModif($stmt);
    }

    #[Override]
    public function getByUserId(int $utilisateurId): array
    {
        $sql = "SELECT mc.modif_id ,
        mc.modif_contact, 
        mc.modif_description ,
        mc.commande_id , 
        mc.modif_date,
        c.utilisateur_id as utilisateur_id
        FROM modif_commande mc
        JOIN commande c ON mc.commande_id=c.commande_id
        WHERE c.utilisateur_id =:utilisateur_id";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':utilisateur_id', $utilisateurId, PDO::PARAM_INT);
        $stmt->execute();

        $result = $this->hydrateModif($stmt);
        return $result;
    }

    #[Override]
    public function save(ModifCommande $modifCommande): void
    {
        $stmt = $this->pdo->prepare("INSERT INTO modif_commande (modif_contact, modif_description ,commande_id ) 
        VALUES (:modif_contact,:modif_description, :commande_id)");
        $stmt->execute([':modif_contact' => $modifCommande->getModifContact(), ':modif_description' => $modifCommande->getModifDescription(), ':commande_id' => $modifCommande->getCommandeId()]);
    }

    #[Override]
    public function delete(int $modifId): void
    {
        throw new \Exception('Not implemented');
    }


    private function hydrateModif(PDOStatement $stmt): array
    {
        $modifCommande = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $modifCommandeObj = new ModifCommande(
                modif_id: $row['modif_id'],
                modif_contact: $row['modif_contact'],
                modif_description: $row['modif_description'],
                modif_date: $row['modif_date'],
                commande_id: $row['commande_id'],
                utilisateur_id: $row['utilisateur_id']
            );
            $modifCommande[] = $modifCommandeObj;
        }
        return $modifCommande;
    }
}
