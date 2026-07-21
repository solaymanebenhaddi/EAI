<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

apiGuardRequest('application/json', 32768);

try {
    $rawBody = file_get_contents('php://input');
    $body = json_decode(is_string($rawBody) ? $rawBody : '', true);

    if (!is_array($body) || json_last_error() !== JSON_ERROR_NONE) {
        apiRespond(['error' => 'Le format de la requête est invalide.'], 400);
    }

    if (apiText($body['honeypot'] ?? '', 200) !== '') {
        apiRespond(['success' => true]);
    }

    apiRequireHumanTiming($body['formStartedAt'] ?? null);

    $name = apiText($body['name'] ?? '', 100);
    $email = strtolower(apiText($body['email'] ?? '', 100));
    $phone = apiText($body['phone'] ?? '', 20);
    $city = apiText($body['city'] ?? '', 100);
    $category = apiText($body['category'] ?? '', 100);
    $type = apiText($body['type'] ?? '', 100);
    $message = apiText($body['msg'] ?? '', 2000);

    if ($message === '') {
        $message = 'Aucun message';
    }

    if ($name === '' || $email === '' || $phone === '' || $city === '' || $category === '' || $type === '') {
        apiRespond(['error' => 'Veuillez remplir tous les champs obligatoires.'], 400);
    }

    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        apiRespond(['error' => 'Veuillez saisir une adresse e-mail valide.'], 400);
    }

    $normalizedPhone = preg_replace('/[\s\-.()]/', '', $phone);
    if (!is_string($normalizedPhone) || !preg_match('/^(?:(?:\+|00)212|0)[5-7]\d{8}$/', $normalizedPhone)) {
        apiRespond(['error' => 'Veuillez saisir un numéro de téléphone marocain valide.'], 400);
    }

    if (!in_array($category, ['Résidentiel', 'Commercial'], true)) {
        apiRespond(['error' => 'Veuillez sélectionner une catégorie de projet valide.'], 400);
    }

    $fingerprint = hash('sha256', implode('|', [
        $email,
        $normalizedPhone,
        $city,
        $category,
        $type,
        $message,
    ]));
    apiProtectSubmission('contact', $email, $normalizedPhone, $fingerprint);

    $config = apiLoadMailConfig();
    $safeName = apiEscape($name);
    $safeEmail = apiEscape($email);
    $safePhone = apiEscape($normalizedPhone);
    $safeCity = apiEscape($city);
    $safeCategory = apiEscape($category);
    $safeType = apiEscape($type);
    $safeMessage = nl2br(apiEscape($message), false);

    $internalContent = <<<HTML
<p>Une nouvelle demande de contact a été soumise depuis le site.</p>
<table role="presentation" width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
  <tr><td style="border-bottom:1px solid #eee;"><strong>Nom :</strong></td><td style="border-bottom:1px solid #eee;">{$safeName}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Email :</strong></td><td style="border-bottom:1px solid #eee;"><a href="mailto:{$safeEmail}" style="color:#8a9a5b;">{$safeEmail}</a></td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Téléphone :</strong></td><td style="border-bottom:1px solid #eee;">{$safePhone}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Ville :</strong></td><td style="border-bottom:1px solid #eee;">{$safeCity}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Catégorie :</strong></td><td style="border-bottom:1px solid #eee;">{$safeCategory}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Type :</strong></td><td style="border-bottom:1px solid #eee;">{$safeType}</td></tr>
</table>
<div style="margin-top:25px;padding:20px;background:#f9f9f9;border-left:4px solid #8a9a5b;">
  <p style="margin-top:0;font-weight:bold;">Message :</p>
  <p style="margin-bottom:0;">{$safeMessage}</p>
</div>
HTML;

    $internalText = "Nouvelle demande de contact (EAI Construction)\n"
        . "Nom: {$name}\nEmail: {$email}\nTéléphone: {$normalizedPhone}\n"
        . "Ville: {$city}\nCatégorie: {$category}\nType: {$type}\nMessage:\n{$message}";

    $internalMail = apiCreateMailer($config);
    $internalMail->addAddress((string) $config['contact_to']);
    $internalMail->addReplyTo($email, $name);
    $internalMail->isHTML(true);
    $internalMail->Subject = "Nouvelle demande de contact — {$name}";
    $internalMail->Body = apiEmailTemplate('Nouvelle demande de contact', $internalContent);
    $internalMail->AltBody = $internalText;
    $internalMail->send();

    // The lead is safely delivered once the internal email succeeds. A confirmation
    // failure is logged but does not encourage the visitor to submit a duplicate lead.
    try {
        $confirmationContent = <<<HTML
<p>Bonjour {$safeName},</p>
<p>Nous avons bien reçu votre demande de contact et nous vous en remercions.</p>
<p>Notre équipe l'étudiera avec attention et reviendra vers vous très prochainement.</p>
<p><strong>Projet :</strong> {$safeCategory} — {$safeType}<br><strong>Ville :</strong> {$safeCity}</p>
<p style="margin-top:30px;">Cordialement,<br><strong>L'équipe ELAOUAD Architecture &amp; Ingénierie</strong></p>
HTML;

        $confirmationMail = apiCreateMailer($config);
        $confirmationMail->addAddress($email, $name);
        $confirmationMail->isHTML(true);
        $confirmationMail->Subject = 'Confirmation de réception de votre demande — ELAOUAD';
        $confirmationMail->Body = apiEmailTemplate('Confirmation de réception', $confirmationContent);
        $confirmationMail->AltBody = "Bonjour {$name},\n\nNous avons bien reçu votre demande de contact. Notre équipe reviendra vers vous très prochainement.\n\nL'équipe ELAOUAD Architecture & Ingénierie";
        $confirmationMail->send();
    } catch (Throwable $confirmationError) {
        error_log('EAI contact confirmation email failed: ' . $confirmationError->getMessage());
    }

    apiRespond(['success' => true]);
} catch (Throwable $error) {
    error_log('EAI contact form failed: ' . $error->getMessage());
    apiRespond(['error' => 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.'], 500);
}
