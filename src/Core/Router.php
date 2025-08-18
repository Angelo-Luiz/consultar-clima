<?php
declare(strict_types=1);

namespace App\Core;

use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;

class Router
{
    private array $routes = [];
    private ContainerInterface $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function add(string $method, string $path, string $controller): void
    {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $controller,
        ];
    }

    public function run(): void
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        foreach ($this->routes as $route) {
        if ($route['method'] === $requestMethod && $route['path'] === $requestUri) {
            $controller = $this->container->get($route['handler']);
            $controller->run($requestUri);
        }
    }


        http_response_code(404);
        echo json_encode(['error' => 'Rota não encontrada']);
    }
}
