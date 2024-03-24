<?php

function validateTemperature($temperature)
{
  return is_numeric($temperature) && is_finite($temperature);
}

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
}

function validateWeatherData($data)
{
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
