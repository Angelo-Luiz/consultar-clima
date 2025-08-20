<?php
declare(strict_types=1);

namespace App\Services\Impl;

use App\Constants\ConfigConstants;
use App\Repository\Impl\ClimateHistoricRepository;
use App\Services\Abstracts\AbstractService;
use App\Services\ServiceInterface;

class ClimateService extends AbstractService implements ServiceInterface
{
    private ClimateHistoricRepository $climateHistoricRepository;
    private array $formData = [];
    public const ACTION = 'current';

    public function __construct(ClimateHistoricRepository $climateHistoricRepository)
    {
        $this->climateHistoricRepository = $climateHistoricRepository;
    }

    public function getClimate(): array
    {
        $url = $this->buildUrl([
            ConfigConstants::URL_WEATHERSTACK,
            self::ACTION,
        ]);
        $data = $this->request(
            $url,
            ConfigConstants::GET,
            ['access_key' => ConfigConstants::API_KEY_WHEATHERSTACK, 'query' => $this->formData['cityName']],
        true
        );

        $this->climateHistoricRepository->insert([
            'detalhes' => json_encode($data['data'], JSON_UNESCAPED_UNICODE)
        ]);

        return $data;
    }

    public function getHistoric(): array
    {
        return $this->climateHistoricRepository->getAll();
    }

    public function setFormData(array $formData): void
    {
        $this->formData = $formData;
    }
}
