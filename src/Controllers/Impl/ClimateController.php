<?php
declare(strict_types=1);

namespace App\Controllers\Impl;

use App\Controllers\ControllerInterface;
use App\Services\Impl\Impl\ClimateService;
use App\Utils\Impl\Response;
use Exception;

class ClimateController implements ControllerInterface
{
    private ClimateService $climateService;
    public const ACTIONS = [
        '/api/get-climate-by-city-name' => 'getClimate',
    ];

    public function __construct(ClimateService $climateService)
    {
        $this->climateService = $climateService;
    }

    public function run(string $action): void
    {
        try {
            $method = self::ACTIONS[$action];
            if (! $method) {
                throw new Exception('Action not found.');
            }

            $data = $this->$method();
            Response::success($data);
        } catch (Exception $expection) {
            Response::error(['message' => $expection->getMessage()]);
        }
    }

    private function getClimate(): void
    {
        $this->climateService->getClimate();
    }
}
