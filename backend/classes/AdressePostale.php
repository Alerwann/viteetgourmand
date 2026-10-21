<?php

class AdressePostale
{
    private ?int $numero_rue;
    private string $street;
    private string $ville;
    private ?int $code_postal;
    private string $pays;

    public function __construct(string $street, string $ville, string $pays, ?int $numero_rue = null,  ?int $code_postal = null)
    {

        $this->street = $street;
        $this->ville = $ville;
        $this->pays = $pays;
        $this->numero_rue = $numero_rue;
        $this->code_postal = $code_postal;
    }

    // GET/SET numéro de rue

    public function getNumRue(): ?int
    {
        return $this->numero_rue;
    }

    public function setNumRue(?int $numero): void
    {
        $this->numero_rue = $numero;
    }

    // GET/SET street
    public function getStreet(): string
    {
        return $this->street;
    }

    public function setStreet(string $street): void
    {
        $this->street = $street;
    }

    // GET/SET Ville
    public function getVille(): string
    {
        return $this->ville;
    }

    public function setVille(string $ville): void
    {
        $this->ville = $ville;
    }

    // GET/SET Code Postal

    public function getCodePostal(): ?int
    {
        return $this->code_postal;
    }

    public function setCodePostal(?int $code_postal): void
    {
        $this->code_postal = $code_postal;
    }

    // GET/SET Pays
    public function getPays(): string
    {
        return $this->pays;
    }

    public function setPays(string $pays): void
    {
        $this->pays = $pays;
    }

    public function toArray(): array
    {
        return [
            "numero_rue" => $this->numero_rue,
            "street" => $this->street,
            "code_postal" => $this->code_postal,
            "ville" => $this->ville,
            "pays" => $this->pays
        ];
    }
}
