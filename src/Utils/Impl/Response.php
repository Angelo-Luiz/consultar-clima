<?php
declare(strict_types=1);

namespace App\Utils\Impl;

use App\Utils\ResponseInterface;

class Response implements ResponseInterface
{
    public static function success(array $data): void
    {
        self::send('success', 200, $data);
    }

    public static function error(array $data): void
    {
        self::send('error', 400, $data);
    }

    public static function send(string $status,int $httpCode, array $data): void
    {
        http_response_code($httpCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
