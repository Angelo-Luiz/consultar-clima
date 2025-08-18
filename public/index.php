<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

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
