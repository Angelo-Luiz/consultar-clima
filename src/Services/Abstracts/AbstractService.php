<?php
declare(strict_types=1);

namespace App\Services\Abstracts;

use App\Services\ServiceInterface;
use Exception;

class AbstractService implements ServiceInterface
{
    public const SUCCES_CODE = [200, 201];
    public const SUCCESS = 'success';
    public const ERROR = 'error';

    public function request(string $router, string $method, array $data = [], bool $urlParams = false): array
    {
        $curl = curl_init();
        if ($urlParams) {
            $router .= '?' . http_build_query($data);
        }
        $options = [
            CURLOPT_URL => $router,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $this->setHeader(),
            CURLOPT_POSTFIELDS => $this->setPostFields($data, $urlParams),
        ];

        curl_setopt_array($curl, $options);
        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        return $this->handleReturn(
            intval($httpCode),
            json_decode($response, true)
        );
    }

    protected function handleReturn(int $httpCode, array $response): array
    {
        if (! in_array($httpCode, self::SUCCES_CODE)) {
           throw new Exception($response['error']['info']);
        }
        return [
            'status' => self::SUCCESS,
            'code' => $httpCode,
            'data' => $response,
        ];
    }

    protected function setPostFields(array $data, bool $urlParams): string
    {
        if ($urlParams) {
            return '';
        }
        return json_encode($data);
    }

    protected function setHeader(): array
    {
        return [
          'Content-Type' => 'application/json'
        ];
    }

    protected function buildUrl(array $params): string
    {
        return implode('/', $params);
    }
}
