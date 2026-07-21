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

// Submission limits are shared by the contact and careers endpoints.
const EAI_IP_DAILY_LIMIT = 3;
const EAI_IP_BURST_LIMIT = 2;
const EAI_NETWORK_DAILY_LIMIT = 15;
const EAI_IDENTITY_DAILY_LIMIT = 3;
const EAI_GLOBAL_BURST_LIMIT = 15;
const EAI_GLOBAL_DAILY_LIMIT = 100;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'");

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
    $origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
    $referer = trim((string) ($_SERVER['HTTP_REFERER'] ?? ''));
    $source = $origin !== '' ? $origin : $referer;
    $requestHost = strtolower((string) parse_url(
        'https://' . ($_SERVER['HTTP_HOST'] ?? ''),
        PHP_URL_HOST
    ));
    $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));

    // Legitimate browser fetches provide Origin or Referer. Requiring one blocks
    // blind cross-site posts; it is not treated as the only bot defense.
    if ($source === '' || $sourceHost === '' || $requestHost === '' || !hash_equals($requestHost, $sourceHost)) {
        apiRespond(['error' => 'Origine de la requête non autorisée.'], 403);
    }

    $fetchSite = strtolower(trim((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '')));
    if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'same-site'], true)) {
        apiRespond(['error' => 'Origine de la requête non autorisée.'], 403);
    }
}

function apiContentLength(): int
{
    return max(0, (int) ($_SERVER['CONTENT_LENGTH'] ?? 0));
}

function apiRequireContentType(string $expected): void
{
    $contentType = strtolower(trim((string) ($_SERVER['CONTENT_TYPE'] ?? '')));
    $mediaType = trim(explode(';', $contentType, 2)[0]);

    if ($mediaType === '' || !hash_equals(strtolower($expected), $mediaType)) {
        apiRespond(['error' => 'Le type de contenu de la requête est invalide.'], 415);
    }
}

function apiRequireHumanTiming($value): void
{
    if (!is_scalar($value) || !preg_match('/^\d{13}$/', (string) $value)) {
        apiRespond(['error' => 'Veuillez actualiser la page puis réessayer.'], 400);
    }

    $nowMilliseconds = (int) floor(microtime(true) * 1000);
    $elapsed = $nowMilliseconds - (int) $value;

    // Three seconds rejects instant bot posts. Six hours leaves ample time for
    // accessibility needs while preventing indefinitely reusable stale pages.
    if ($elapsed < 3000 || $elapsed > 6 * 60 * 60 * 1000) {
        apiRespond(['error' => 'Veuillez actualiser la page puis réessayer.'], 400);
    }
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

function apiEnsureRateLimitDirectory(): void
{
    if (!is_dir(EAI_RATE_LIMIT_DIR) && !mkdir(EAI_RATE_LIMIT_DIR, 0700, true) && !is_dir(EAI_RATE_LIMIT_DIR)) {
        throw new RuntimeException('Unable to create the rate-limit directory.');
    }

    @chmod(EAI_RATE_LIMIT_DIR, 0700);
}

function apiCleanupRateLimitFiles(): void
{
    $marker = EAI_RATE_LIMIT_DIR . '/.cleanup';
    $lastCleanup = @filemtime($marker);
    if ($lastCleanup !== false && time() - $lastCleanup < 3600) {
        return;
    }

    $handle = @fopen($marker, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX | LOCK_NB)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return;
    }

    clearstatcache(true, $marker);
    $lastCleanup = @filemtime($marker);
    if ($lastCleanup === false || time() - $lastCleanup >= 3600) {
        $files = glob(EAI_RATE_LIMIT_DIR . '/*.json');
        $removed = 0;

        if (is_array($files)) {
            foreach ($files as $file) {
                if ($removed >= 500) {
                    break;
                }

                $modified = @filemtime($file);
                if ($modified !== false && time() - $modified > 2 * 86400 && @unlink($file)) {
                    $removed++;
                }
            }
        }

        @touch($marker);
        @chmod($marker, 0600);
    }

    flock($handle, LOCK_UN);
    fclose($handle);
}

function apiClientIp(): string
{
    $ip = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
    return filter_var($ip, FILTER_VALIDATE_IP) !== false ? $ip : 'unknown';
}

function apiClientNetwork(string $ip): string
{
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false) {
        $parts = explode('.', $ip);
        return implode('.', array_slice($parts, 0, 3)) . '.0/24';
    }

    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) !== false) {
        $packed = inet_pton($ip);
        if ($packed !== false) {
            return substr(bin2hex($packed), 0, 16) . '/64';
        }
    }

    return 'unknown';
}

function apiConsumeRateLimit(string $bucket, string $identifier, int $maximum, int $windowSeconds): array
{
    apiEnsureRateLimitDirectory();
    apiCleanupRateLimitFiles();

    $key = hash('sha256', $bucket . '|' . $identifier);
    $path = EAI_RATE_LIMIT_DIR . '/' . $key . '.json';
    $handle = @fopen($path, 'c+');

    if ($handle === false) {
        throw new RuntimeException('Unable to open the rate-limit state.');
    }

    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        throw new RuntimeException('Unable to lock the rate-limit state.');
    }

    try {
        $raw = stream_get_contents($handle);
        $state = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
        $now = time();

        if (!is_array($state)
            || !isset($state['started'], $state['count'])
            || $now - (int) $state['started'] >= $windowSeconds
        ) {
            $state = ['started' => $now, 'count' => 0];
        }

        $expiresAt = (int) $state['started'] + $windowSeconds;
        if ((int) $state['count'] >= $maximum) {
            return [
                'allowed' => false,
                'retry_after' => max(1, $expiresAt - $now),
            ];
        }

        $state['count'] = (int) $state['count'] + 1;
        $state['updated'] = $now;
        $encoded = json_encode($state);

        if (!is_string($encoded)
            || !rewind($handle)
            || !ftruncate($handle, 0)
            || fwrite($handle, $encoded) === false
            || !fflush($handle)
        ) {
            throw new RuntimeException('Unable to persist the rate-limit state.');
        }

        @chmod($path, 0600);

        return [
            'allowed' => true,
            'retry_after' => max(1, $expiresAt - $now),
        ];
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function apiEnforceRateLimit(string $bucket, string $identifier, int $maximum, int $windowSeconds): void
{
    try {
        $result = apiConsumeRateLimit($bucket, $identifier, $maximum, $windowSeconds);
    } catch (Throwable $error) {
        error_log('EAI mail API rate-limit failure (' . $bucket . '): ' . $error->getMessage());
        apiRespond(['error' => 'Le service est temporairement indisponible. Veuillez réessayer.'], 503);
    }

    if (!$result['allowed']) {
        header('Retry-After: ' . (int) $result['retry_after']);
        apiRespond(['error' => 'La limite d’envoi a été atteinte. Veuillez réessayer plus tard.'], 429);
    }
}

function apiGuardRequest(string $contentType, int $maximumBytes): void
{
    apiRequirePost();
    apiRequireSameOrigin();
    apiRequireContentType($contentType);

    if (apiContentLength() > $maximumBytes) {
        apiRespond(['error' => 'La requête est trop volumineuse.'], 413);
    }

    // A single shared counter bounds PHP work even when an attacker rotates IPs.
    apiEnforceRateLimit('request-global-minute', 'site', 60, 60);
}

function apiProtectSubmission(string $scope, string $email, string $phone, string $fingerprint): void
{
    $ip = apiClientIp();
    $network = apiClientNetwork($ip);
    $emailIdentity = strtolower(trim($email));
    $phoneIdentity = preg_replace('/\D+/', '', $phone);
    $phoneIdentity = is_string($phoneIdentity) && $phoneIdentity !== '' ? $phoneIdentity : 'unknown';

    // Put narrow limits before global counters so repeated abuse from one identity
    // cannot consume the whole site's allowance after that identity is blocked.
    $limits = [
        ['submission-ip-burst', 'ip|' . $ip, EAI_IP_BURST_LIMIT, 10 * 60],
        ['submission-ip-daily', 'ip|' . $ip, EAI_IP_DAILY_LIMIT, 86400],
        ['submission-network-daily', 'network|' . $network, EAI_NETWORK_DAILY_LIMIT, 86400],
        ['submission-email-daily', 'email|' . $emailIdentity, EAI_IDENTITY_DAILY_LIMIT, 86400],
        ['submission-phone-daily', 'phone|' . $phoneIdentity, EAI_IDENTITY_DAILY_LIMIT, 86400],
        ['submission-duplicate', $scope . '|' . $fingerprint, 2, 30 * 60],
        ['submission-global-burst', 'site', EAI_GLOBAL_BURST_LIMIT, 10 * 60],
        ['submission-global-daily', 'site', EAI_GLOBAL_DAILY_LIMIT, 86400],
    ];

    foreach ($limits as $limit) {
        apiEnforceRateLimit($limit[0], $limit[1], $limit[2], $limit[3]);
    }
}
