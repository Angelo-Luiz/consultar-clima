<?php
declare(strict_types=1);

namespace App\Repository\Abstracts;

use App\Database\Impl\Database;
use App\Repository\RepositoryInterface;
use PDO;

abstract class AbstractRepository implements RepositoryInterface
{
    protected PDO $connection;
    protected string $table;

    public function __construct(Database $db, string $table)
    {
        $this->connection = $db->getConnection();
        $this->table = $table;
    }

    public function getOneByKey(string $key, $value): ?array
    {
        $stmt = $this->connection->prepare("SELECT * FROM {$this->table} WHERE {$key} = :value LIMIT 1");
        $stmt->execute(['value' => $value]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    public function getAll(): array
    {
        $stmt = $this->connection->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert(array $data): bool
    {
        $columns = implode(',', array_keys($data));
        $placeholders = implode(',', array_map(fn($k) => ":$k", array_keys($data)));
        $stmt = $this->connection->prepare("INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})");
        return $stmt->execute($data);
    }

    public function update(string $key, $value, array $data): bool
    {
        $set = implode(',', array_map(fn($k) => "$k = :$k", array_keys($data)));
        $stmt = $this->connection->prepare("UPDATE {$this->table} SET {$set} WHERE {$key} = :_key");
        $data['_key'] = $value;
        return $stmt->execute($data);
    }

    public function delete(string $key, $value): bool
    {
        $stmt = $this->connection->prepare("DELETE FROM {$this->table} WHERE {$key} = :value");
        return $stmt->execute(['value' => $value]);
    }
}
