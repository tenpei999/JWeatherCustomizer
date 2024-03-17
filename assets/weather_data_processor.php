<?
include 'holiday_api_client.php';
include 'cache_manager.php';
include 'validation_functions.php';

function getDateRangeArray($startDate, $endDate)
{
  $dateArray = [];
  $currentDate = strtotime($startDate);
  while ($currentDate <= strtotime($endDate)) {
    $dateArray[] = date('Y-m-d', $currentDate);
    $currentDate = strtotime("+1 day", $currentDate);
  }
  return $dateArray;
}

function getOneWeekDatesWithHolidays($addBreak = false)
{
  $cache = [];
  $today = date('Y-m-d');
  $sixDaysLater = date('Y-m-d', strtotime("+6 days", strtotime($today)));

  $oneWeekDates = getDateRangeArray($today, $sixDaysLater);
  $holidays = fetchHolidaysWithCache();

  return array_map(function ($date) use ($holidays) {
    $timestamp = strtotime($date);
    $dayOfWeek = date('w', $timestamp);
    $weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    $formattedDate = date('n月j日', $timestamp) . '(' . $weekDays[$dayOfWeek] . ')';

    return [
      'date' => [
        'month' => date('n月', $timestamp),
        'day' => date('j日', $timestamp),
        'dayOfWeek' => '(' . $weekDays[$dayOfWeek] . ')',
        'fullDate' => $formattedDate,
      ],
      'isHoliday' => isset($holidays[$date]),
      'holidayName' => $holidays[$date] ?? null,
      'isSaturday' => $dayOfWeek == 6,
      'isSunday' => $dayOfWeek == 0,
    ];
  }, $oneWeekDates);
}

// この関数を呼び出して1週間の日付と祝日の情報を取得
$datesWithHoliday = getOneWeekDatesWithHolidays();

function getWeatherInfo($weatherCode)
{
  // プラグインの画像パスを指定
  // 注意: このパスはプラグインの構造に合わせて適宜調整してください。
  $pluginImagePaths = JWEATHERCUSTOMIZER_URL . 'images/';

  // 天気コードに基づいてラベルとアイコンを返す
  if ($weatherCode === 0) {
    return ['label' => "快晴", 'icon' => $pluginImagePaths . '100.svg'];
  }
  if ($weatherCode === 1) {
    return ['label' => "晴れ", 'icon' => $pluginImagePaths . '100.svg'];
  }
  if ($weatherCode === 2) {
    return ['label' => "一部曇", 'icon' => $pluginImagePaths . '101.svg'];
  }
  if ($weatherCode === 3) {
    return ['label' => "曇り", 'icon' => $pluginImagePaths . '200.svg'];
  }
  if ($weatherCode <= 49) {
    return ['label' => "霧", 'icon' => $pluginImagePaths . '200.svg'];
  }
  if ($weatherCode <= 59) {
    return ['label' => "霧雨", 'icon' => $pluginImagePaths . '202.svg'];
  }
  if ($weatherCode <= 69) {
    return ['label' => "雨", 'icon' => $pluginImagePaths . '300.svg'];
  }
  if ($weatherCode <= 79) {
    return ['label' => "雪", 'icon' => $pluginImagePaths . '400.svg'];
  }
  if ($weatherCode <= 84) {
    return ['label' => "俄か雨", 'icon' => $pluginImagePaths . '302.svg'];
  }
  if ($weatherCode <= 94) {
    return ['label' => "雪・雹", 'icon' => $pluginImagePaths . '400.svg'];
  }
  if ($weatherCode <= 99) {
    return ['label' => "雷雨", 'icon' => $pluginImagePaths . '300.svg'];
  }

  // 未定義のコードはエラーとする
  return ['label' => "ERROR", 'icon' => ""];
}

function sanitizeImageUrl($url)
{
  // FILTER_VALIDATE_URLフィルターでURLを検証
  $sanitizedUrl = filter_var($url, FILTER_VALIDATE_URL);

  // URLが有効ならそのURLを、そうでなければ空文字列を返す
  return $sanitizedUrl ? $sanitizedUrl : '';
};

function fetchWeatherDataWithCache($apiUrl, $uniqueID)
{

  $data = checkWeatherCache($apiUrl, $uniqueID);

  if (!validateWeatherData($data)) {
    // 天気データが無効な場合、処理を中断
    logMessage("Weather data validation failed.");
    return [];
  }

  error_log("data" . print_r($data, true));
  $weatherCodesForWeek = $data['daily']['weathercode'];
  $weatherNamesForWeek = array_map(function ($code) {
    $info = getWeatherInfo($code);
    return $info['label'];
  }, $weatherCodesForWeek);

  $weatherImageForWeek = array_map(function ($code) {
    $info = getWeatherInfo($code);
    return sanitizeImageUrl($info['icon']);
  }, $weatherCodesForWeek);
  $highestTemperatureForWeek = array_map(function ($temp) {
    return validateTemperature($temp) ? $temp : null;
  }, $data['daily']['temperature_2m_max']);
  $lowestTemperatureForWeek = array_map(function ($temp) {
    return validateTemperature($temp) ? $temp : null;
  }, $data['daily']['temperature_2m_min']);
  $highestTemperatureDifferencesForWeek = [];
  $lowestTemperatureDifferencesForWeek = [];
  $rainProbability1 = [];


  for ($i = 0; $i < count($highestTemperatureForWeek) - 1; $i++) {
    $todayMaxTemperature = $highestTemperatureForWeek[$i + 1];
    $yesterdayMaxTemperature = $highestTemperatureForWeek[$i];
    $temperatureDifference = ceil(($todayMaxTemperature - $yesterdayMaxTemperature) * 10) / 10;
    $formattedDifference = $temperatureDifference >= 0 ? "(+{$temperatureDifference})" : "(-" . abs($temperatureDifference) . ")";

    $highestTemperatureDifferencesForWeek[] = $formattedDifference;
  };

  for ($i = 0; $i < count($lowestTemperatureForWeek) - 1; $i++) {
    $todayMinTemperature = $lowestTemperatureForWeek[$i + 1];
    $yesterdayMinTemperature = $lowestTemperatureForWeek[$i];
    $temperatureDifference = ceil(($todayMinTemperature - $yesterdayMinTemperature) * 10) / 10;
    $formattedDifference = $temperatureDifference >= 0 ? "(+{$temperatureDifference})" : "(-" . abs($temperatureDifference) . ")";

    $lowestTemperatureDifferencesForWeek[] = $formattedDifference;
  };
  for ($i = 1; $i <= 7; $i++) {
    $baseTime = $i === 1 ? 0 : 24 * ($i - 1);
    $rainProbability1[$i] = [];

    for ($j = 0; $j < 4; $j++) {
      $timeIndex = $baseTime + $j * 6;
      $rainProbability1[$i][] = [
        'time' => $data['hourly']['time'][$timeIndex],
        'precipitation_probability' => $data['hourly']['precipitation_probability'][$timeIndex]
      ];
    }
  }

  $todayWeather = [];
  $tomorrowWeather = [];
  $weeklyWeather = [];


  $datesWithHoliday = getOneWeekDatesWithHolidays();
  foreach ($datesWithHoliday as $index => $dateInfo) {
    // $weatherNamesForWeekや他の天気情報配列が日付情報配列と同じ長さであることを確認
    if (isset($weatherNamesForWeek[$index])) {
      $dailyData[] = [
        'day' => $dateInfo,
        'name' => $weatherNamesForWeek[$index + 1],
        'image' => $weatherImageForWeek[$index + 1],
        'highestTemperature' => $highestTemperatureForWeek[$index + 1],
        'lowestTemperature' => $lowestTemperatureForWeek[$index + 1],
        'maximumTemperatureComparison' => $highestTemperatureDifferencesForWeek[$index + 1],
        'lowestTemperatureComparison' => $lowestTemperatureDifferencesForWeek[$index + 1] ?? null,
        'rainProbability' => $rainProbability1[$index + 1] ?? null,
      ];
      // 最初の要素を今日の天気データとして取得
      if (isset($dailyData[0])) {
        $todayWeather = $dailyData[0];
      }

      // 2番目の要素を明日の天気データとして取得
      if (isset($dailyData[1])) {
        $tomorrowWeather = $dailyData[1];
      }

      // 3番目以降の要素を週間の天気データとして取得
      if (count($dailyData) > 2) {
        $weeklyWeather = array_slice($dailyData, 2);
      }
    }
  }

  return [
    'today' => $todayWeather,
    'tomorrow' => $tomorrowWeather,
    'weekly' => $weeklyWeather,
  ];
}
