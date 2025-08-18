<?php
namespace App\Repository;

interface RepositoryInterface
{
    public function getOneByKey(string $key, $value): ?array;
    public function getAll(): array;
    public function insert(array $data): bool;
    public function update(string $key, $value, array $data): bool;
    public function delete(string $key, $value): bool;
}
