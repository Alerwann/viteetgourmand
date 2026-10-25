    <?php

    use App\Services\AuthService;

    require_once __DIR__ . '/../classes/Utilisateur.php';
    require_once __DIR__ . '/../classes/AdressePostale.php';
    require_once __DIR__ . '/../service/auth_service.php';

    class UtilisateurController
    {
        private PDO $pdo;
        private AuthService $authService;


        public function __construct(PDO $pdo)
        {
            $this->pdo = $pdo;
            $this->authService = new AuthService($pdo);
        }

        public function findUserById(int $id): ?Utilisateur
        {


            $stmt = $this->pdo->prepare("SELECT utilisateur_id, email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id FROM utilisateur WHERE utilisateur_id=:utilisateur_id ");
            $stmt->bindValue(':utilisateur_id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                return null;
            }

            $adresse = new AdressePostale(
                street: $row['street'],
                ville: $row['ville'],
                pays: $row['pays'],
                numero_rue: $row['numero_rue'] !== null ? (int)$row['numero_rue'] : null,
                code_postal: $row['code_postal'] !== null ? (int)$row['code_postal'] : null
            );


            $userObj = Utilisateur::fromDatabase(
                email: $row['email'],
                password: $row['password'],
                prenom: $row['prenom'],
                nom: $row['nom'],
                telephone: $row['telephone'],
                adresse_postale: $adresse,
                is_actif: (bool)$row['is_actif'],
                role_id: (int)$row['role_id'],
                utilisateur_id: (int)$row['utilisateur_id']

            );

            return $userObj;
        }

        public function getAllUtilisateurs(): void
        {
            try {
                $stmt = $this->pdo->query("SELECT utilisateur_id, email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id FROM utilisateur");
                $listUtilisateurs = [];

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                    $adresse = new AdressePostale(
                        street: $row['street'],
                        ville: $row['ville'],
                        pays: $row['pays'],
                        numero_rue: $row['numero_rue'] !== null ? (int)$row['numero_rue'] : null,
                        code_postal: $row['code_postal'] !== null ? (int)$row['code_postal'] : null
                    );


                    $userObj = Utilisateur::fromDataBase(
                        email: $row['email'],
                        password: $row['password'],
                        prenom: $row['prenom'],
                        nom: $row['nom'],
                        telephone: $row['telephone'],
                        adresse_postale: $adresse,
                        is_actif: (bool)$row['is_actif'],
                        role_id: (int)$row['role_id'],
                        utilisateur_id: (int)$row['utilisateur_id']
                    );

                    $listUtilisateurs[] = [
                        "utilisateur_id" => $userObj->getUtilisateurID(),
                        "email" => $userObj->getEmail(),
                        "prenom" => $userObj->getPrenom(),
                        "nom" => $userObj->getNom(),
                        "telephone" => $userObj->getTel(),
                        "is_actif" => $userObj->getIsActif(),
                        "role_id" => $userObj->getRoleId(),
                        "adresse_postale" => [
                            "numero_rue" => $userObj->getAdressePostal()->getNumRue(),
                            "street" => $userObj->getAdressePostal()->getStreet(),
                            "code_postal" => $userObj->getAdressePostal()->getCodePostal(),
                            "ville" => $userObj->getAdressePostal()->getVille(),
                            "pays" => $userObj->getAdressePostal()->getPays()
                        ]
                    ];
                }

                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($listUtilisateurs);
            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
            }
        }

        public function getOneById(): void
        {
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["message" => "Données incomplètes."]);
                return;
            } else {
                $id = $_GET['id'];
            }
            try {
                $user = $this->findUserById($id);
                if ($user == null) {
                    http_response_code(404);
                    echo json_encode(["message" => "Utilisateur inexistant"]);
                    return;
                }
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($user->toArray());
            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
            }
        }

        public function createUtilisateur(): void
        {
            $data = json_decode(file_get_contents("php://input"), true);

            if (empty($data) || !isset($data['email'], $data['password'], $data['prenom'], $data['nom'], $data['telephone'], $data['adresse_postale'], $data['role_id'])) {
                http_response_code(400);
                echo json_encode(["message" => "Données incomplètes."]);
                return;
            }

            try {

                $adresseData = $data['adresse_postale'];
                $adresse = new AdressePostale(
                    street: $adresseData['street'],
                    ville: $adresseData['ville'],
                    pays: $adresseData['pays'],
                    numero_rue: $adresseData['numero_rue'] ?? null,
                    code_postal: $adresseData['code_postal'] ?? null
                );



                $user = Utilisateur::register(
                    email: $data['email'],
                    password: $data['password'],
                    prenom: $data['prenom'],
                    nom: $data['nom'],
                    telephone: $data['telephone'],
                    adresse_postale: $adresse,
                    is_actif: $data['is_actif'] ?? true,
                    role_id: (int)$data['role_id']
                );


                $stmt = $this->pdo->prepare("
                    INSERT INTO utilisateur (email, password, prenom, nom, telephone, numero_rue, street, code_postal, ville, pays, is_actif, role_id) 
                    VALUES (:email, :password, :prenom, :nom, :telephone, :numero_rue, :street, :code_postal, :ville, :pays, :is_actif, :role_id)
                ");

                $stmt->execute([
                    ':email' => $user->getEmail(),
                    ':password' => $user->getPasswordHash(),
                    ':prenom' => $user->getPrenom(),
                    ':nom' => $user->getNom(),
                    ':telephone' => $user->getTel(),
                    ':numero_rue' => $user->getAdressePostal()->getNumRue(),
                    ':street' => $user->getAdressePostal()->getStreet(),
                    ':code_postal' => $user->getAdressePostal()->getCodePostal(),
                    ':ville' => $user->getAdressePostal()->getVille(),
                    ':pays' => $user->getAdressePostal()->getPays(),
                    ':is_actif' => $user->getIsActif() ? 1 : 0,
                    ':role_id' => $user->getRoleId()
                ]);

                http_response_code(201);
                echo json_encode([
                    "message" => "Utilisateur créé avec succès !",
                    "id" => (int) $this->pdo->lastInsertId()
                ]);
            } catch (\InvalidArgumentException $e) {

                http_response_code(400);
                echo json_encode(["message" => $e->getMessage()]);
            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
            }
        }

        public function updateOne(): void
        {
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["message" => "Données incomplètes."]);
                return;
            } else {
                $id =  $_GET['id'];
            }
            $data =  json_decode(file_get_contents("php://input"), true);

            try {
                $user = $this->findUserById($id);

                if ($user == null) {
                    http_response_code(404);
                    echo json_encode(["message" => "Utilisateur non trouvé"]);
                    return;
                }

                foreach ($data as $key => $value) {
                    switch ($key) {
                        case 'email':
                            if ($user->getEmail() !== $value) {
                                $user->setEmail($value);
                            }
                            break;
                        case 'prenom':
                            if ($user->getPrenom() !== $value) {
                                $user->setPrenom($value);
                            }
                            break;
                        case 'nom':
                            if ($user->getNom() !== $value) {
                                $user->setNom($value);
                            }
                            break;
                        case 'telephone':
                            if ($user->getTel() !== $value) {
                                $user->setTel($value);
                            }
                            break;
                        case 'is_actif':
                            if ($user->getIsActif() !== (bool)$value) {
                                $user->setIsActif((bool)$value);
                            }
                            break;
                        case 'role_id':
                            if ($user->getRoleId() !== (int)$value) {
                                $user->setRoleId((int)$value);
                            }
                            break;
                    }
                }

                // Requête UPDATE avec les getters de l'objet mis à jour
                $stmt = $this->pdo->prepare("UPDATE utilisateur 
                                            SET email = :email,  
                                                prenom = :prenom, 
                                                nom = :nom, 
                                                telephone = :telephone, 
                                                numero_rue = :numero_rue, 
                                                street = :street, 
                                                code_postal = :code_postal, 
                                                ville = :ville, 
                                                pays = :pays, 
                                                is_actif = :is_actif, 
                                                role_id = :role_id
                                            WHERE utilisateur_id = :utilisateur_id");

                $stmt->execute([
                    ':utilisateur_id' => $id,
                    ':email' => $user->getEmail(),
                    ':prenom' => $user->getPrenom(),
                    ':nom' => $user->getNom(),
                    ':telephone' => $user->getTel(),
                    ':numero_rue' => $user->getAdressePostal()->getNumRue(),
                    ':street' => $user->getAdressePostal()->getStreet(),
                    ':code_postal' => $user->getAdressePostal()->getCodePostal(),
                    ':ville' => $user->getAdressePostal()->getVille(),
                    ':pays' => $user->getAdressePostal()->getPays(),
                    ':is_actif' => $user->getIsActif() ? 1 : 0,
                    ':role_id' => $user->getRoleId()
                ]);

                http_response_code(200);
                echo json_encode(["message" => "Utilisateur mis à jour avec succès"]);
            } catch (\Throwable $th) {
                http_response_code(500);
                echo json_encode(["message" => "Erreur : " . $th->getMessage()]);
            }
        }

        public function updatePassword(): void
        {
            $token = $_GET['token'] ?? null;
            $data = json_decode(file_get_contents("php://input"), true);

            if (!$token || empty($data['password'])) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Token ou nouveau mot de passe manquant."]);
                return;
            }

            $success = $this->authService->updatePassword($token, $data['password']);

            if (!$success) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Token invalide ou expiré."]);
                return;
            }

            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Mot de passe mis à jour avec succès."]);
        }
    }
