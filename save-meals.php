<?php
/**
 * Save meals data to data/meals.json.
 * Accepts POST with JSON body: { "mealTypes": [], "proteins": [], "meals": [] }
 * Used when the app runs on a server with PHP (e.g. QNAP NAS).
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Empty body']);
  exit;
}

$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

if (!isset($data['mealTypes']) || !isset($data['proteins']) || !isset($data['meals'])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'JSON must contain mealTypes, proteins, and meals']);
  exit;
}

if (!is_array($data['mealTypes']) || !is_array($data['proteins']) || !is_array($data['meals'])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'mealTypes, proteins, and meals must be arrays']);
  exit;
}

$dir = __DIR__ . '/data';
$file = $dir . '/meals.json';

if (!is_dir($dir)) {
  if (!@mkdir($dir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not create data directory']);
    exit;
  }
}

$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
if ($json === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to encode JSON']);
  exit;
}

if (file_put_contents($file, $json) === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Could not write file. Check write permission for data/meals.json']);
  exit;
}

echo json_encode(['ok' => true]);
