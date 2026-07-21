<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

// This file is a shared include, not a public endpoint.
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}

const EAI_COMPOSER_AUTOLOAD = '/home/eaiconst/eai-api/vendor/autoload.php';
const EAI_MAIL_CONFIG = '/home/eaiconst/eai-private/mail-config.php';
const EAI_RATE_LIMIT_DIR = '/home/eaiconst/eai-private/rate-limits';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

if (!is_file(EAI_COMPOSER_AUTOLOAD) || !is_readable(EAI_COMPOSER_AUTOLOAD)) {
    error_log('EAI mail API: Composer autoloader is missing or unreadable.');
    apiRespond(['error' => 'Le service de messagerie est temporairement indisponible.'], 500);
}

require_once EAI_COMPOSER_AUTOLOAD;

function apiRespond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE
    );
    exit;
}

function apiRequirePost(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        apiRespond(['error' => 'Méthode non autorisée.'], 405);
    }
}

function apiRequireSameOrigin(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $requestHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);

    // Non-browser clients may omit Origin. Browser submissions must be same-origin.
    if ($origin === '') {
        return;
    }

    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($originHost === '' || $requestHost === '' || !hash_equals($requestHost, $originHost)) {
        apiRespond(['error' => 'Origine de la requête non autorisée.'], 403);
    }
}

function apiContentLength(): int
{
    return max(0, (int) ($_SERVER['CONTENT_LENGTH'] ?? 0));
}

function apiText($value, int $maxLength): string
{
    if (!is_scalar($value)) {
        return '';
    }

    $text = trim((string) $value);
    if (function_exists('mb_substr')) {
        return mb_substr($text, 0, $maxLength, 'UTF-8');
    }

    return substr($text, 0, $maxLength);
}

function apiEscape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function apiLoadMailConfig(): array
{
    if (!is_file(EAI_MAIL_CONFIG) || !is_readable(EAI_MAIL_CONFIG)) {
        throw new RuntimeException('Mail configuration is missing or unreadable.');
    }

    $config = require EAI_MAIL_CONFIG;
    if (!is_array($config)) {
        throw new RuntimeException('Mail configuration must return an array.');
    }

    $required = [
        'host',
        'port',
        'encryption',
        'username',
        'password',
        'from_email',
        'from_name',
        'contact_to',
        'careers_to',
    ];

    foreach ($required as $key) {
        if (!isset($config[$key]) || trim((string) $config[$key]) === '') {
            throw new RuntimeException('Mail configuration is incomplete.');
        }
    }

    return $config;
}

function apiCreateMailer(array $config): PHPMailer
{
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = (string) $config['host'];
    $mailer->Port = (int) $config['port'];
    $mailer->SMTPAuth = true;
    $mailer->Username = (string) $config['username'];
    $mailer->Password = (string) $config['password'];
    $mailer->Timeout = 20;
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;

    $encryption = strtolower((string) $config['encryption']);
    if ($encryption === 'smtps' || $encryption === 'ssl') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'starttls' || $encryption === 'tls') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mailer->setFrom((string) $config['from_email'], (string) $config['from_name']);

    return $mailer;
}

function apiEmailTemplate(string $title, string $contentHtml): string
{
    $safeTitle = apiEscape($title);

    return <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{$safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#1a1a1a;padding:36px 30px;text-align:center;border-bottom:4px solid #8a9a5b;">
              <div style="font-size:30px;font-weight:800;color:#fff;letter-spacing:-1px;">ELAOUAD</div>
              <div style="font-size:11px;font-weight:600;color:#ccc;letter-spacing:2px;text-transform:uppercase;margin-top:7px;">Architecture et Ingénierie</div>
            </td>
          </tr>
          <tr>
            <td style="padding:38px 40px 8px;">
              <h1 style="margin:0;font-size:22px;line-height:1.3;">{$safeTitle}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 40px 40px;font-size:15px;line-height:1.65;color:#4a4a4a;">
              {$contentHtml}
            </td>
          </tr>
          <tr>
            <td style="background:#fafafa;padding:28px 40px;border-top:1px solid #eee;text-align:center;font-size:12px;color:#888;line-height:1.6;">
              <strong>ELAOUAD Architecture &amp; Ingénierie</strong><br>
              Casablanca, Maroc<br>
              +212 666 798 536 &nbsp;|&nbsp; +212 688 018 863 &nbsp;|&nbsp; +212 520 198 738<br>
              <a href="https://eai-construction.com" style="color:#8a9a5b;text-decoration:none;">eai-construction.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

function apiRateLimit(string $bucket, int $maximum, int $windowSeconds): bool
{
    if (!is_dir(EAI_RATE_LIMIT_DIR) && !mkdir(EAI_RATE_LIMIT_DIR, 0700, true) && !is_dir(EAI_RATE_LIMIT_DIR)) {
        error_log('EAI mail API: Unable to create the rate-limit directory.');
        return true; // Fail open so a filesystem issue does not block legitimate leads.
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', $bucket . '|' . $ip);
    $path = EAI_RATE_LIMIT_DIR . '/' . $key . '.json';
    $handle = @fopen($path, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        error_log('EAI mail API: Unable to open the rate-limit state.');
        return true;
    }

    $raw = stream_get_contents($handle);
    $state = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
    $now = time();

    if (!is_array($state) || !isset($state['started'], $state['count']) || $now - (int) $state['started'] >= $windowSeconds) {
        $state = ['started' => $now, 'count' => 0];
    }

    $allowed = (int) $state['count'] < $maximum;
    if ($allowed) {
        $state['count'] = (int) $state['count'] + 1;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($state));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod($path, 0600);

    return $allowed;
}
