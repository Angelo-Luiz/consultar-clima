CREATE TABLE historico_consultas
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    detalhes     JSON,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO historico_consultas (detalhes, data_criacao)
VALUES ('{
  "current": {
    "astro": {
      "sunset": "06:13 PM",
      "moonset": "01:31 PM",
      "sunrise": "06:59 AM",
      "moonrise": "03:16 AM",
      "moon_phase": "Waning Crescent",
      "moon_illumination": 30
    },
    "is_day": "yes",
    "precip": 0,
    "humidity": 100,
    "pressure": 1021,
    "uv_index": 1,
    "wind_dir": "SSE",
    "feelslike": 17,
    "cloudcover": 75,
    "visibility": 9,
    "wind_speed": 4,
    "air_quality": {
      "co": "303.4",
      "o3": "73",
      "no2": "9.25",
      "so2": "1.665",
      "pm10": "22.015",
      "pm2_5": "20.535",
      "us-epa-index": "2",
      "gb-defra-index": "2"
    },
    "temperature": 17,
    "wind_degree": 150,
    "weather_code": 296,
    "weather_icons": [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0017_cloudy_with_light_rain.png"
    ],
    "observation_time": "07:23 PM",
    "weather_descriptions": [
      "Light Rain"
    ]
  },
  "request": {
    "type": "City",
    "unit": "m",
    "query": "Chapecó, Brasil",
    "language": "en"
  },
  "location": {
    "lat": "-27.083",
    "lon": "-52.983",
    "name": "Chapecó",
    "region": "Santa Catarina",
    "country": "Brasil",
    "localtime": "2025-08-18 16:23",
    "utc_offset": "-3.0",
    "timezone_id": "America/Sao_Paulo",
    "localtime_epoch": 1755534180
  }
}',
        NOW()),
       ('{
         "current": {
           "astro": {
             "sunset": "06:02 PM",
             "moonset": "03:46 PM",
             "sunrise": "05:37 AM",
             "moonrise": "02:32 AM",
             "moon_phase": "Waning Crescent",
             "moon_illumination": 12
           },
           "is_day": "yes",
           "precip": 0,
           "humidity": 76,
           "pressure": 1010,
           "uv_index": 7,
           "wind_dir": "SE",
           "feelslike": 32,
           "cloudcover": 82,
           "visibility": 10,
           "wind_speed": 5,
           "air_quality": {
             "co": "253.45",
             "o3": "22",
             "no2": "12.395",
             "so2": "6.66",
             "pm10": "11.47",
             "pm2_5": "10.73",
             "us-epa-index": "1",
             "gb-defra-index": "1"
           },
           "temperature": 28,
           "wind_degree": 143,
           "weather_code": 176,
           "weather_icons": [
             "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0009_light_rain_showers.png"
           ],
           "observation_time": "01:12 AM",
           "weather_descriptions": [
             "Patchy rain nearby"
           ]
         },
         "request": {
           "type": "City",
           "unit": "m",
           "query": "San Carlos, Philippines",
           "language": "en"
         },
         "location": {
           "lat": "10.487",
           "lon": "123.420",
           "name": "San Carlos",
           "region": "San Carlos",
           "country": "Philippines",
           "localtime": "2025-08-20 09:12",
           "utc_offset": "8.0",
           "timezone_id": "Asia/Manila",
           "localtime_epoch": 1755681120
         }
       }',
        NOW());
