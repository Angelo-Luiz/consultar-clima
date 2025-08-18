<?php

namespace App\Utils;

interface ResponseInterface
{
    public static function success(array $data): void;
    public static function error(array $data): void;
    public static function send(string $status, int $httpCode, array $data): void;
}
