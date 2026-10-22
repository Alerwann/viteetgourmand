<?php

require_once 'AdressePostale.php';


class Utilisateur
{
    private ?int $utilisateur_id;
    private string $email;
    private string $password;
    private string $prenom;
    private string $nom;
    private string $telephone;
    private AdressePostale $adresse_postale;
    private bool $is_actif;
    private int $role_id;


    // constructeurs 
    // Général
    private function __construct(string $email, string $password, string $prenom, string $nom, string $telephone, AdressePostale $adresse_postale, bool $is_actif, int $role_id, ?int $utilisateur_id = null)
    {
        $this->email = $email;
        $this->password = $password;
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->telephone = $telephone;
        $this->adresse_postale = $adresse_postale;
        $this->is_actif = $is_actif;
        $this->role_id = $role_id;
        $this->utilisateur_id = $utilisateur_id;
    }

    //Si nouveau
    public static function register(string $email, string $password, string $prenom, string $nom, string $telephone, AdressePostale $adresse_postale, bool $is_actif, int $role_id, ?int $utilisateur_id = null): self
    {
        if (strlen($password) < 8) {
            throw new \InvalidArgumentException("Le mot de passe doit faire au moins 8 caractères.");
        }

        $hashPassword = password_hash($password, PASSWORD_DEFAULT);


        return new self($email, $hashPassword, $prenom, $nom, $telephone, $adresse_postale, $is_actif, $role_id, $utilisateur_id);
    }

    //Si déjà présent
    public static function fromDataBase(string $email, string $password, string $prenom, string $nom, string $telephone, AdressePostale $adresse_postale, bool $is_actif, int $role_id, ?int $utilisateur_id = null): self
    {


        return new self($email, $password, $prenom, $nom, $telephone, $adresse_postale, $is_actif, $role_id, $utilisateur_id);
    }


    // GET utilisateur_id

    public function getUtilisateurID(): ?int
    {
        return $this->utilisateur_id;
    }

    // GET/SET email

    public function getEmail(): string
    {

        return $this->email;
    }

    public function setEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Format d'email invalide.");
        }
        $this->email = $email;
    }

    // SET password 


    public function setPassword(string $plainPassword): void
    {

        if (strlen($plainPassword) < 8) {
            throw new \InvalidArgumentException("Le mot de passe doit faire au moins 8 caractères.");
        }

        $this->password = password_hash($plainPassword, PASSWORD_DEFAULT);
    }

    // GET/SET Hash Password
    public function setPasswordHash(string $passwordHash): void
    {
        $this->password = $passwordHash;
    }

    public function getPasswordHash(): string
    {
        return $this->password;
    }

    // GET/SET prénom

    public function getPrenom(): string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): void
    {
        $this->prenom = $prenom;
    }

    // GET/SET Nom

    public function getNom(): string
    {
        return $this->nom;
    }

    public function setNom(string $nom): void
    {
        $this->nom = $nom;
    }

    // GET/SET Téléphone

    public function getTel(): string
    {
        return $this->telephone;
    }

    public function setTel(string $telephone): void
    {
        $this->telephone = $telephone;
    }

    // GET/SET is_actif

    public function getIsActif(): bool
    {
        return $this->is_actif;
    }

    public function setIsActif(bool $is_actif): void
    {
        $this->is_actif = $is_actif;
    }

    // GET/SET role_id

    public function getRoleId(): int
    {
        return $this->role_id;
    }

    public function setRoleId(int $role_id): void
    {
        $this->role_id = $role_id;
    }

    // GET/SET adresse postale

    public function getAdressePostal(): AdressePostale
    {
        return $this->adresse_postale;
    }

    public function setAdressePostal(AdressePostale $address): void
    {

        $this->adresse_postale = $address;
    }

    public function toArray(): array
    {
        return [
            "utilisateur_id" => $this->utilisateur_id,
            "email" => $this->email,
            "prenom" => $this->prenom,
            "nom" => $this->nom,
            "telephone" => $this->telephone,
            "is_actif" => $this->is_actif,
            "role_id" => $this->role_id,
            "adresse_postale" => $this->adresse_postale->toArray()
        ];
    }

    // Et comme ton contrôleur a besoin du hash pour l'insertion en BDD, 
    // on ajoute un getter spécifique (qui porte bien son nom pour ne pas le confondre avec un getPassword public classique) :

}
