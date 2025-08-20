<?php
declare(strict_types=1);

namespace App\Core;

use App\Constants\ConfigConstants;
use App\Controllers\Impl\ClimateController;

class RegisterRoutes
{
    private Router $router;

    public function __construct(Router $router)
    {
        $this->router = $router;
    }

    public function registerRoutes(): void
    {
        $this->router->add(ConfigConstants::GET, '/api/get-climate-by-city-name', ClimateController::class);
        $this->router->add(ConfigConstants::GET, '/api/get-historic', ClimateController::class);
    }
}
