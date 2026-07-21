<?php

declare(strict_types=1);

require_once __DIR__ . '/_bootstrap.php';

function careersValidateCv(string $path, string $extension): bool
{
    $header = file_get_contents($path, false, null, 0, 8);
    if (!is_string($header)) {
        return false;
    }

    if ($extension === 'pdf') {
        return substr($header, 0, 5) === '%PDF-';
    }

    if ($extension === 'doc') {
        return bin2hex($header) === 'd0cf11e0a1b11ae1';
    }

    if ($extension === 'docx') {
        if (substr($header, 0, 2) !== 'PK') {
            return false;
        }

        if (class_exists('ZipArchive')) {
            $archive = new ZipArchive();
            $opened = $archive->open($path);
            if ($opened !== true) {
                return false;
            }

            $isDocument = $archive->locateName('[Content_Types].xml') !== false
                && $archive->locateName('word/document.xml') !== false;
            $archive->close();

            return $isDocument;
        }

        // If ZipArchive is unavailable, require a recognized OOXML/ZIP MIME type
        // in addition to the ZIP signature.
        if (class_exists('finfo')) {
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mime = $finfo->file($path);
            return in_array($mime, [
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/zip',
            ], true);
        }
    }

    return false;
}

function careersOptionalUrl(string $value): ?string
{
    if ($value === '') {
        return null;
    }

    $validated = filter_var($value, FILTER_VALIDATE_URL);
    if ($validated === false) {
        return null;
    }

    $scheme = strtolower((string) parse_url($value, PHP_URL_SCHEME));
    return in_array($scheme, ['http', 'https'], true) ? $value : null;
}

apiRequirePost();
apiRequireSameOrigin();

if (apiContentLength() > 7 * 1024 * 1024) {
    apiRespond(['error' => 'La candidature est trop volumineuse.'], 413);
}

if (!apiRateLimit('careers', 3, 60)) {
    apiRespond(['error' => 'Trop de requêtes. Veuillez patienter.'], 429);
}

try {
    if (apiText($_POST['honeypot'] ?? '', 200) !== '') {
        apiRespond(['success' => true]);
    }

    $name = apiText($_POST['name'] ?? '', 100);
    $email = strtolower(apiText($_POST['email'] ?? '', 100));
    $phone = apiText($_POST['phone'] ?? '', 30);
    $experience = apiText($_POST['experience'] ?? '', 50);
    $linkedinInput = apiText($_POST['linkedin'] ?? '', 200);
    $portfolioInput = apiText($_POST['portfolio'] ?? '', 200);
    $message = apiText($_POST['message'] ?? '', 2000);
    $jobId = apiText($_POST['jobId'] ?? 'spontaneous', 100);
    $consent = strtolower(apiText($_POST['consent'] ?? '', 10));

    $jobs = [
        'spontaneous' => 'Candidature spontanée',
        'interior-designer' => 'Architecte d’Intérieur Senior',
    ];

    if (!isset($jobs[$jobId])) {
        apiRespond(['error' => 'Le poste sélectionné est invalide.'], 400);
    }

    if ($name === '' || $email === '' || $phone === '' || $experience === '') {
        apiRespond(['error' => 'Veuillez remplir tous les champs obligatoires.'], 400);
    }

    if ($consent !== 'true' && $consent !== '1' && $consent !== 'on') {
        apiRespond(['error' => 'Votre consentement est requis pour envoyer la candidature.'], 400);
    }

    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        apiRespond(['error' => 'Veuillez saisir une adresse e-mail valide.'], 400);
    }

    if (!preg_match('/^[0-9+\s().-]{7,30}$/', $phone)) {
        apiRespond(['error' => 'Veuillez saisir un numéro de téléphone valide.'], 400);
    }

    $linkedin = careersOptionalUrl($linkedinInput);
    $portfolio = careersOptionalUrl($portfolioInput);
    if ($linkedinInput !== '' && $linkedin === null) {
        apiRespond(['error' => 'Veuillez saisir une URL LinkedIn valide.'], 400);
    }
    if ($portfolioInput !== '' && $portfolio === null) {
        apiRespond(['error' => 'Veuillez saisir une URL de portfolio valide.'], 400);
    }

    $cv = $_FILES['cv'] ?? null;
    if (!is_array($cv) || (int) ($cv['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        apiRespond(['error' => 'Veuillez joindre votre CV.'], 400);
    }

    $cvSize = (int) ($cv['size'] ?? 0);
    $temporaryPath = (string) ($cv['tmp_name'] ?? '');
    $originalName = (string) ($cv['name'] ?? '');
    $extension = strtolower((string) pathinfo($originalName, PATHINFO_EXTENSION));

    if ($cvSize <= 0 || $cvSize > 5 * 1024 * 1024) {
        apiRespond(['error' => 'Le fichier CV ne doit pas dépasser 5 Mo.'], 400);
    }

    if (!in_array($extension, ['pdf', 'doc', 'docx'], true)) {
        apiRespond(['error' => 'Le fichier CV doit être au format PDF, DOC ou DOCX.'], 400);
    }

    if ($temporaryPath === '' || !is_uploaded_file($temporaryPath) || !careersValidateCv($temporaryPath, $extension)) {
        apiRespond(['error' => 'Le contenu du fichier CV ne correspond pas au format attendu.'], 400);
    }

    $mimeByExtension = [
        'pdf' => 'application/pdf',
        'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    $safeAttachmentName = 'CV_' . preg_replace('/[^A-Za-z0-9_-]/', '_', $jobId)
        . '_' . gmdate('Ymd_His') . '.' . $extension;

    $config = apiLoadMailConfig();
    $jobTitle = $jobs[$jobId];
    $safeJobTitle = apiEscape($jobTitle);
    $safeName = apiEscape($name);
    $safeEmail = apiEscape($email);
    $safePhone = apiEscape($phone);
    $safeExperience = apiEscape($experience);
    $safeLinkedin = apiEscape($linkedin ?? 'Non fourni');
    $safePortfolio = apiEscape($portfolio ?? 'Non fourni');
    $safeMessage = nl2br(apiEscape($message !== '' ? $message : 'Aucun message'), false);

    $internalContent = <<<HTML
<p>Une nouvelle candidature a été soumise depuis le site.</p>
<table role="presentation" width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
  <tr><td style="border-bottom:1px solid #eee;"><strong>Poste :</strong></td><td style="border-bottom:1px solid #eee;color:#8a9a5b;font-weight:bold;">{$safeJobTitle}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Nom :</strong></td><td style="border-bottom:1px solid #eee;">{$safeName}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Email :</strong></td><td style="border-bottom:1px solid #eee;"><a href="mailto:{$safeEmail}" style="color:#8a9a5b;">{$safeEmail}</a></td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Téléphone :</strong></td><td style="border-bottom:1px solid #eee;">{$safePhone}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Expérience :</strong></td><td style="border-bottom:1px solid #eee;">{$safeExperience}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>LinkedIn :</strong></td><td style="border-bottom:1px solid #eee;">{$safeLinkedin}</td></tr>
  <tr><td style="border-bottom:1px solid #eee;"><strong>Portfolio :</strong></td><td style="border-bottom:1px solid #eee;">{$safePortfolio}</td></tr>
</table>
<div style="margin-top:25px;padding:20px;background:#f9f9f9;border-left:4px solid #8a9a5b;">
  <p style="margin-top:0;font-weight:bold;">Lettre de motivation / Message :</p>
  <p style="margin-bottom:0;">{$safeMessage}</p>
</div>
<p><em>Le CV du candidat est joint à cet email.</em></p>
HTML;

    $internalText = "Nouvelle candidature (EAI Construction)\n"
        . "Poste: {$jobTitle}\nNom: {$name}\nEmail: {$email}\nTéléphone: {$phone}\n"
        . "Expérience: {$experience}\nLinkedIn: " . ($linkedin ?? 'Non fourni') . "\n"
        . "Portfolio: " . ($portfolio ?? 'Non fourni') . "\nMessage:\n"
        . ($message !== '' ? $message : 'Aucun message');

    $internalMail = apiCreateMailer($config);
    $internalMail->addAddress((string) $config['careers_to']);
    $internalMail->addReplyTo($email, $name);
    $internalMail->isHTML(true);
    $internalMail->Subject = "Nouvelle candidature — {$jobTitle} — {$name}";
    $internalMail->Body = apiEmailTemplate("Candidature : {$jobTitle}", $internalContent);
    $internalMail->AltBody = $internalText;
    $internalMail->addAttachment(
        $temporaryPath,
        $safeAttachmentName,
        'base64',
        $mimeByExtension[$extension]
    );
    $internalMail->send();

    try {
        $confirmationContent = <<<HTML
<p>Bonjour {$safeName},</p>
<p>Nous vous confirmons la bonne réception de votre candidature pour : <strong>{$safeJobTitle}</strong>.</p>
<p>Notre équipe RH étudiera votre profil avec attention. Si votre profil correspond à nos besoins, nous reviendrons vers vous prochainement.</p>
<p style="margin-top:30px;">Cordialement,<br><strong>L'équipe RH d'ELAOUAD Architecture &amp; Ingénierie</strong></p>
HTML;

        $confirmationMail = apiCreateMailer($config);
        $confirmationMail->addAddress($email, $name);
        $confirmationMail->isHTML(true);
        $confirmationMail->Subject = 'Confirmation de réception de votre candidature — ELAOUAD';
        $confirmationMail->Body = apiEmailTemplate('Confirmation de candidature', $confirmationContent);
        $confirmationMail->AltBody = "Bonjour {$name},\n\nNous confirmons la réception de votre candidature pour {$jobTitle}. Notre équipe RH étudiera votre profil avec attention.\n\nL'équipe ELAOUAD Architecture & Ingénierie";
        $confirmationMail->send();
    } catch (Throwable $confirmationError) {
        error_log('EAI careers confirmation email failed: ' . $confirmationError->getMessage());
    }

    apiRespond(['success' => true]);
} catch (Throwable $error) {
    error_log('EAI careers form failed: ' . $error->getMessage());
    apiRespond(['error' => 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.'], 500);
}
