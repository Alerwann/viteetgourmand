<?php


require_once __DIR__ . '/../classes/Avis.php';

class AvisController{
        
    private PDO $pdo;


    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    
    public function getAllAvis():void{

          try {
            $stmt = $this->pdo->query("SELECT avis_id, title,description, status,note FROM avis");       
            $listAvis=[];

        
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                
                $avisObj = new Avis(
                title: $row['title'],
                description: $row['description'],
                status: $row['status'],
                note: $row['note'],
                avis_id:(int) $row['avis_id']
                
                );
        
                $listAvis[] = $avisObj->toArray();         
            }
            
            http_response_code(200);
            echo json_encode($listAvis);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    }

    public function getSelectAvis():void{
        $limite = isset($_GET['limite']) ? (int) $_GET['limite'] : 5;
        try {
            $stmt = $this->pdo->prepare("SELECT avis_id,title,description, status,note FROM avis ORDER BY created_at DESC LIMIT :limite ");
            $stmt->bindValue(':limite', $limite, PDO::PARAM_INT);
            $stmt->execute();

            $listAvis=[];

        
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                
                $avisObj = new Avis(
                title: $row['title'],
                description: $row['description'],
                status: $row['status'],
                note: $row['note'],
                avis_id:(int) $row['avis_id']
                
                );
        
                $listAvis[] = $avisObj->toArray();         
            }
            
            http_response_code(200);
            echo json_encode($listAvis);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }

    }

    public function createAvis(){
     $data = json_decode(file_get_contents("php://input"), true);

     if(empty($data)|| !isset($data['title'], $data['description'], $data['status'], $data['note'])){
        http_response_code(400);
            echo json_encode(["message" => "Données incomplètes (titre, description, status, note)."]);
            return;
     }

        try {
            $stmt= $this->pdo->prepare("INSERT INTO avis (title,description,status,note) VALUES (:title,:description,:status,:note)");
            $stmt->execute([':title'=>$data['title'], ':description'=>$data['description'], ':status'=>$data['status'], ':note'=>$data['note']]);
            http_response_code(201); 
            echo json_encode([
                "message" => "Avis créé avec succès !",
                "id" => (int) $this->pdo->lastInsertId()
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erreur : " . $e->getMessage()]);
        }
    

    }

}