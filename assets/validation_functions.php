<?php

/**
 * Validates if the provided temperature value is numeric and finite.
 * 
 * @param mixed $temperature The temperature value to validate.
 * @return bool True if the temperature is valid, false otherwise.
 */
function validateTemperature($temperature)
{
  return is_numeric($temperature) && is_finite($temperature);
};

/**
 * Validates the structure and format of holiday data.
 * Ensures that holidays are provided as an array with each date matching the YYYY-MM-DD format
 * and each holiday name being a string.
 * 
 * @param mixed $holidays The holiday data to validate.
 * @return bool True if the holiday data is valid, false otherwise.
 */
function validateHolidayData($holidays)
{
  if (!is_array($holidays)) {
    logMessage("Holiday data is not an array.");
    return false;
  }
  foreach ($holidays as $date => $holidayName) {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || !is_string($holidayName)) {
      logMessage("Invalid holiday data format.");
      return false;
    }
  }
  return true;
};

/**
 * Validates the structure and content of weather data against a set of required keys and data types.
 * Checks for the existence of each key and verifies the data type of its value,
 * ensuring the data meets the expected format for weather information.
 * 
 * @param array $data The weather data to validate.
 * @return bool True if the weather data is valid, false otherwise.
 */
function validateWeatherData($data)
{
   // Mapping of required keys to their expected data types.
  $requiredKeys = [
    'latitude' => 'float',
    'longitude' => 'float',
    'generationtime_ms' => 'float',
    'utc_offset_seconds' => 'integer',
    'timezone' => 'string',
    'timezone_abbreviation' => 'string',
    'elevation' => 'integer',
    'hourly_units' => 'array',
    'hourly' => 'array',
    'daily_units' => 'array',
    'daily' => 'array'
  ];

  foreach ($requiredKeys as $key => $type) {
    if (!array_key_exists($key, $data)) {
      logMessage("必要なキーが不足しています: $key");
      return false;
    }
    $functionName = "is_$type";
    if (!$functionName($data[$key]) && !($type === 'array' && is_array($data[$key]))) {
      logMessage("キーのデータ型が無効です: $key");
      return false;
    }
  }

  $hourlyUnitsRequiredKeys = [
    'time' => 'string',
    'precipitation_probability' => 'string',
    'weathercode' => 'string'
  ];

  foreach ($hourlyUnitsRequiredKeys as $key => $expectedType) {
    if (!array_key_exists($key, $data['hourly_units'])) {
      logMessage("'hourly_units'に必要なキーが不足しています: $key");
      return false;
    }
    if (gettype($data['hourly_units'][$key]) !== $expectedType) {
      logMessage("'hourly_units.$key'の型が無効です");
      return false;
    }
  }

  return true; 
}
