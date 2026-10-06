<?php

class Avis{
    private ?int $avis_id;
    private string $title;
    private string $description;
    private string $status;
    private string $note;

    public function __construct(string $title, string $description, string $status, string $note, ?int $avis_id = null){
        $this->avis_id=$avis_id;
        $this->title=$title;
        $this->description=$description;
        $this->note=$note;
        $this->status=$status;
        }

       public function getAvisId(): ?int {
        return $this->avis_id;
        }

       public function getTitle(): string {
        return $this->title;
        }

       public function getDescription(): string{
        return $this->description;
        }
        
        public function getStatus():string{
            return $this->status;
        }

        public function getNote():string{
            return $this->note;
        }

     public function toArray(): array {
        return [
            "avis_id" => $this->avis_id,
            "title" => $this->title,
            "description" => $this->description,
            "status"=> $this->status,
            "note"=>$this->note
        ];
    }

       
}