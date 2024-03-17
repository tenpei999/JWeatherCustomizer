<?php

function validateTemperature($temperature)
{
  // 温度データが数値であることを検証
  return is_numeric($temperature) && is_finite($temperature);
}

function validateHolidayData($holidays)
{
  // 祝日データが期待する配列形式であることを確認
  if (!is_array($holidays)) {
    logMessage("Holiday data is not an array.");
    return false;
  }
  foreach ($holidays as $date => $holidayName) {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || !is_string($holidayName)) {
      // 日付がYYYY-MM-DD形式であり、祝日名が文字列であることを確認
      logMessage("Invalid holiday data format.");
      return false;
    }
  }
  return true;
}

function validateWeatherData($data)
{
  // 必要なトップレベルキーと期待される型
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

  // トップレベルキーとその型を検証
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

  // 'hourly_units' 構造を検証
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

  // 'hourly' と 'daily' 配列に対して、同様にさらに深い検証を実装することができます
  // 'hourly' と 'daily' 配列が期待される構造を持っているかを検証します
  // これには、配列の長さ、含まれる値の型などをチェックする作業が含まれます

  return true; // すべての検証をパス
}
