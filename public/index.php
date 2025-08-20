<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\RegisterRoutes;
use App\Core\Router;
use App\Database\Impl\Database;
use DI\ContainerBuilder;

$builder = new ContainerBuilder();
$builder->useAutowiring(true);

$builder->addDefinitions([
    Database::class => \DI\factory(function() {
        return Database::getInstance();
    })
]);

$container = $builder->build();
$router = new Router($container);
$routeRegistrar = new RegisterRoutes($router);
$routeRegistrar->registerRoutes();

$router->run();
