<?php

namespace App\Database;

use PDO;

interface DatabaseInterface
{
    public static function getInstance(): DatabaseInterface;
    public function getConnection(): PDO;
}
