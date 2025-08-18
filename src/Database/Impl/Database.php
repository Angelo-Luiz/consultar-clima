<?php
declare(strict_types=1);

namespace App\Database\Impl;

use App\Constants\ConfigConstants;
use App\Database\DatabaseInterface;
use PDO;

class Database implements DatabaseInterface
{
    private static ?DatabaseInterface $instance = null;
    private PDO $connection;

    private function __construct()
    {
        $host = ConfigConstants::DB_HOST;
        $db = ConfigConstants::DB_NAME;
        $user = ConfigConstants::DB_USER;
        $pass = ConfigConstants::DB_PASS;
        $charset = ConfigConstants::CHARSET;

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $this->connection = new PDO($dsn, $user, $pass, $options);
    }

    public static function getInstance(): DatabaseInterface
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}
