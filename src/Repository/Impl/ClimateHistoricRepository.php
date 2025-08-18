<?php
declare(strict_types=1);

namespace App\Repository\Impl;

use App\Database\Impl\Database;
use App\Repository\Abstracts\AbstractRepository;
use App\Repository\RepositoryInterface;

class ClimateHistoricRepository extends AbstractRepository implements RepositoryInterface
{
    const TABLE_NAME = 'historico_consultas';

    public function __construct(Database $db)
    {
        parent::__construct($db, self::TABLE_NAME);
    }

}
