<?php

namespace App\Entity;

use JsonSerializable;

class ResetData implements JsonSerializable
{
    private ?int $token_id;
    private string $token;
    private int $tentative;
    private int $utilisateur_id;

    public function __construct(string $token, int $tentative, int $utilisateur_id, ?int $token_id = \null)
    {
        $this->token_id = $token_id;
        $this->token = $token;
        $this->tentative = $tentative;
        $this->utilisateur_id = $utilisateur_id;
    }

    public function getTokenId(): int
    {
        return $this->token_id;
    }
    public function getToken(): string
    {
        return $this->token;
    }
    public function getTentative(): int
    {
        return $this->tentative;
    }
    public function getUtilisateurId(): int
    {
        return $this->utilisateur_id;
    }

    public function jsonSerialize(): mixed
    {
        return [
            "token_id" => $this->token_id,
            "token" => $this->token,
            "tentative" => $this->tentative,
            "utilisateur_id" => $this->utilisateur_id
        ];
    }
}
