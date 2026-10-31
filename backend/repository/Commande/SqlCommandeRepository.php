<?php

namespace App\Repository\Commande;

use App\Entity\AdressePostale;
use App\Entity\Commande;
use App\Entity\PrestationDetail;
use App\Enum\StatusCommande;
use App\Repository\Commande\CommandeRepositoryInterface;
use Override;
use PDO;
use PDOStatement;

class SqlCommandeRepository implements CommandeRepositoryInterface
{

    private PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    #[Override]
    public function getAll(): array
    {

        $sql = "SELECT commande_id,
                        commande_ref, 
                        commande_date, 
                        prestation_date, 
                        prestation_heure, 
                        numero_rue, 
                        street, 
                        code_postal, 
                        ville, 
                        pays,
                        nombre_personne, 
                        livraison_prix, 
                        commande_status, 
                        pret_materiel, 
                        restitution_materiel, 
                        utilisateur_id, 
                        menu_id FROM commande";

        $stmt = $this->pdo->query($sql);

        return $this->hydrateCommande($stmt);
    }

    #[Override]
    public function getOne(int $commande_id): ?Commande
    {
        $sql = "SELECT commande_id,
                        commande_ref, 
                        commande_date, 
                        prestation_date, 
                        prestation_heure, 
                        numero_rue, 
                        street, 
                        code_postal, 
                        ville, 
                        pays,
                        nombre_personne, 
                        livraison_prix, 
                        commande_status, 
                        pret_materiel, 
                        restitution_materiel, 
                        utilisateur_id, 
                        menu_id FROM commande
                        WHERE commande_id = ?";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$commande_id]);

        $tab = $this->hydrateCommande($stmt);
        return $tab[0] ?? null;
    }

    #[Override]
    public function getByUtilisateurId(int $utilisateur_id): ?Commande
    {
        $sql = "SELECT commande_id,
                        commande_ref, 
                        commande_date, 
                        prestation_date, 
                        prestation_heure, 
                        numero_rue, 
                        street, 
                        code_postal, 
                        ville, 
                        pays,
                        nombre_personne, 
                        livraison_prix, 
                        commande_status,
                        pret_materiel, 
                        restitution_materiel, 
                        utilisateur_id, 
                        menu_id FROM commande
                        WHERE utilisateur_id = ?";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$utilisateur_id]);

        $tab = $this->hydrateCommande($stmt);
        return $tab[0] ?? null;
    }

    #[Override]
    public function save(Commande $commande): void
    {
        $prestation_detail = $commande->getPresta();
        $prestation_adresse = $prestation_detail->getPrestationAdresse();

        if ($commande->getCommandeId() === null) {
            $sql = "INSERT INTO commande (
                            commande_ref, 
                            commande_date, 
                            prestation_date, 
                            prestation_heure,
                            numero_rue,
                            street,
                            code_postal,
                            ville,
                            pays,
                            nombre_personne, 
                            livraison_prix, 
                            commande_status, 
                            pret_materiel, 
                            restitution_materiel, 
                            utilisateur_id, 
                            menu_id
                        ) VALUES ( 
                            :commande_ref, 
                            :commande_date, 
                            :prestation_date, 
                            :prestation_heure,
                            :numero_rue,
                            :street,
                            :code_postal,
                            :ville,
                            :pays,
                            :nombre_personne, 
                            :livraison_prix, 
                            :commande_status,
                            :pret_materiel, 
                            :restitution_materiel, 
                            :utilisateur_id, 
                            :menu_id
                        )";
        } else {
            $sql = "UPDATE commande SET
                            commande_ref = :commande_ref, 
                            commande_date = :commande_date, 
                            prestation_date = :prestation_date, 
                            prestation_heure = :prestation_heure,
                            numero_rue = :numero_rue,
                            street = :street,
                            code_postal = :code_postal,
                            ville = :ville,
                            pays = :pays,
                            nombre_personne = :nombre_personne, 
                            livraison_prix = :livraison_prix, 
                            commande_status = :commande_status,
                            pret_materiel = :pret_materiel, 
                            restitution_materiel = :restitution_materiel, 
                            utilisateur_id = :utilisateur_id, 
                            menu_id = :menu_id 
                        WHERE commande_id = :commande_id";
        }

        $params = [
            ':commande_ref' => $commande->getCommandeRef(),
            ':commande_date' => $commande->getCommandeDate(),
            ':prestation_date' => $prestation_detail->getPrestationDate(),
            ':prestation_heure' => $prestation_detail->getPrestationHeure(),
            ':numero_rue' => $prestation_adresse->getNumRue(),
            ':street' => $prestation_adresse->getStreet(),
            ':code_postal' => $prestation_adresse->getCodePostal(),
            ':ville' => $prestation_adresse->getVille(),
            ':pays' => $prestation_adresse->getPays(),
            ':nombre_personne' => $commande->getNombrePersonne(),
            ':livraison_prix' => $prestation_detail->getLivraisonPrix(),
            ':commande_status' => $commande->getStatus()->value ?? $commande->getStatus(),
            ':pret_materiel' => $prestation_detail->getPretMateriel(),
            ':restitution_materiel' => $prestation_detail->getRestitutionMateriel(),
            ':utilisateur_id' => $commande->getUtilisateurId(),
            ':menu_id' => $commande->getMenuId()
        ];

        if ($commande->getCommandeId() !== null) {
            $params[':commande_id'] = $commande->getCommandeId();
        }

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
    }

    #[Override]
    public function delete(int $commande_id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM commande WHERE commande_id = :id");
        $stmt->execute([':id' => $commande_id]);
    }

    private function hydrateCommande(PDOStatement $stmt): array
    {
        $commandes = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $prestation_adresse = new AdressePostale(
                street: $row['street'],
                ville: $row['ville'],
                pays: $row['pays'],
                numero_rue: $row['numero_rue'],
                code_postal: $row['code_postal']
            );

            $prestaDetail = new PrestationDetail(
                prestation_date: $row['prestation_date'],
                prestation_heure: $row['prestation_heure'],
                prestation_adresse: $prestation_adresse,
                livraison_prix: $row['livraison_prix'],
                pret_materiel: $row['pret_materiel'],
                restitution_materiel: $row['restitution_materiel']
            );

            $commande = new Commande(
                commande_ref: $row['commande_ref'],
                nombre_personne: $row['nombre_personne'],
                menu_id: $row['menu_id'],
                utilisateur_id: $row['utilisateur_id'],
                commande_presta: $prestaDetail,
                commande_status: StatusCommande::from($row['commande_status']),
                commande_id: $row['commande_id'],
                commande_date: $row['commande_date'],

            );

            $commandes[] = $commande;
        }
        return $commandes;
    }
}
