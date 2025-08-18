<?php
declare(strict_types=1);

namespace App\Services\Impl\Impl;

use App\Constants\ConfigConstants;
use App\Repository\Impl\ClimateHistoricRepository;
use App\Services\Abstracts\AbstractService;
use App\Services\ServiceInterface;

class ClimateService extends AbstractService implements ServiceInterface
{
    private ClimateHistoricRepository $climateHistoricRepository;
    public const URL_WEATHERSTACK = 'https://api.weatherstack.com';
    public const ACTION = 'current';

    public function __construct(ClimateHistoricRepository $climateHistoricRepository)
    {
        $this->climateHistoricRepository = $climateHistoricRepository;
    }

    public function getClimate(): array
    {
        $url = $this->buildUrl([
            self::URL_WEATHERSTACK,
            self::ACTION,
        ]);
        $data = $this->request(
            $url,
            'GET',
            ['access_key' => ConfigConstants::API_KEY_WHEATHERSTACK, 'query' => 'New Delhi'],
        true
        );

        $this->climateHistoricRepository->insert([
            'detalhes' => json_encode($data['data'], JSON_UNESCAPED_UNICODE)
        ]);

        return $data;
    }
}
