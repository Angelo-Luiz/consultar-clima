<?php

namespace App\Services;

interface ServiceInterface
{
    public function request(string $method, string $router, array $data = [], bool $urlParams = false): array;
}
