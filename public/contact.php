<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->fullName) || !isset($data->email) || !isset($data->message)) {
    http_response_code(400);
    echo json_encode(["message" => "Données incomplètes"]);
    exit;
}

$to = 'contact@eai-construction.com';
$subject = 'Nouvelle demande de contact: ' . htmlspecialchars($data->requestType);

$htmlContent = "
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f7f7; color: #333; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e0e0e0; }
  .header { background-color: #1a1a1a; padding: 30px 20px; text-align: center; border-bottom: 3px solid #b39b5b; }
  .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
  .content { padding: 30px; }
  .section { margin-bottom: 25px; }
  .section-title { font-size: 12px; color: #b39b5b; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px; font-weight: bold; }
  .info-item { margin-bottom: 10px; }
  .label { font-weight: bold; color: #555; display: inline-block; width: 140px; }
  .value { color: #222; }
  .message-box { background-color: #f9f9f9; padding: 20px; border-radius: 4px; border-left: 4px solid #b39b5b; color: #444; line-height: 1.6; white-space: pre-wrap; }
  .footer { background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888; }
</style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>Nouvelle Demande EAI</h1>
    </div>
    <div class='content'>
      
      <div class='section'>
        <div class='section-title'>Informations Personnelles</div>
        <div class='info-item'><span class='label'>Nom Complet:</span> <span class='value'>" . htmlspecialchars($data->fullName) . "</span></div>
        <div class='info-item'><span class='label'>Email:</span> <span class='value'><a href='mailto:" . htmlspecialchars($data->email) . "'>" . htmlspecialchars($data->email) . "</a></span></div>
        <div class='info-item'><span class='label'>Téléphone:</span> <span class='value'>" . htmlspecialchars($data->phone) . "</span></div>
        " . (!empty($data->city) ? "<div class='info-item'><span class='label'>Ville:</span> <span class='value'>" . htmlspecialchars($data->city) . "</span></div>" : "") . "
        <div class='info-item'><span class='label'>Profil:</span> <span class='value'>" . htmlspecialchars($data->profile) . "</span></div>
      </div>

      <div class='section'>
        <div class='section-title'>Détails de la Demande</div>
        <div class='info-item'><span class='label'>Type de demande:</span> <span class='value'>" . htmlspecialchars($data->requestType) . "</span></div>
        " . (!empty($data->projectStage) ? "<div class='info-item'><span class='label'>Stade du projet:</span> <span class='value'>" . htmlspecialchars($data->projectStage) . "</span></div>" : "") . "
        " . (!empty($data->estimatedBudget) ? "<div class='info-item'><span class='label'>Budget estimé:</span> <span class='value'>" . htmlspecialchars($data->estimatedBudget) . "</span></div>" : "") . "
        " . (!empty($data->desiredTimeline) ? "<div class='info-item'><span class='label'>Délai souhaité:</span> <span class='value'>" . htmlspecialchars($data->desiredTimeline) . "</span></div>" : "") . "
      </div>

      <div class='section'>
        <div class='section-title'>Message</div>
        <div class='message-box'>" . htmlspecialchars($data->message) . "</div>
      </div>

    </div>
    <div class='footer'>
      Cet email a été envoyé automatiquement depuis le formulaire de contact du site ELAOUAD Architecture & Ingénierie.
    </div>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: EAI Site Web <noreply@eai-construction.com>' . "\r\n";
$headers .= 'Reply-To: ' . htmlspecialchars($data->email) . "\r\n";

if (mail($to, $subject, $htmlContent, $headers)) {
    http_response_code(200);
    echo json_encode(["message" => "Email envoyé avec succès"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Erreur lors de l'envoi de l'email"]);
}
?>
