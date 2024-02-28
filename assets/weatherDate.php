<?
// 共通のキャッシュ機能を利用してデータを取得する関

function fetchDataWithCache($url, $cachePath = 'holidays_cache.json', $cacheDuration = 14400)
{
  if (file_exists($cachePath) && (time() - filemtime($cachePath) < $cacheDuration)) {
    return json_decode(file_get_contents($cachePath), true);
  } else {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);
    if ($err) {
      echo "cURL Error #:" . $err;
      return []; // 空の配列を返し、処理を続行
    } else {
      $data = json_decode($response, true);
      file_put_contents($cachePath, json_encode($data));
      $dataFromCache = false;
      error_log("[" . date('Y-m-d H:i:s') . "] Weather data fetched from API and updated cache.");
    }
  }
  error_log("Weather data detail: " . print_r($data, true));
  return $data;
}

function fetchHolidaysWithCache()
{
  $url = 'https://holidays-jp.github.io/api/v1/date.json';
  return fetchDataWithCache($url);
}

function getHolidays(&$cache)
{
  $today = date('Y-m-d'); // YYYY-MM-DD形式
  if (!isset($cache[$today])) {
    $cache[$today] = fetchHolidaysWithCache();
  }
  return $cache[$today];
}

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
  $sixDaysLater = date('Y-m-d', strtotime($today . ' + 6 days'));

  $oneWeekDates = getDateRangeArray($today, $sixDaysLater);
  $holidays = getHolidays($cache);

  $oneWeekDatesWithHolidays = [];
  foreach ($oneWeekDates as $date) {
    $timestamp = strtotime($date);
    $dayOfWeek = date('w', $timestamp);
    $weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    $formattedDate = date('n月j日', $timestamp) . '(' . $weekDays[$dayOfWeek] . ')';
    $holidayKey = date('Y-m-d', $timestamp);

    $oneWeekDatesWithHolidays[] = [
      'date' => [
        'month' => date('n月', $timestamp),
        'day' => date('j日', $timestamp),
        'dayOfWeek' => '(' . $weekDays[$dayOfWeek] . ')',
        'fullDate' => $formattedDate,
      ],
      'isHoliday' => isset($holidays[$holidayKey]),
      'holidayName' => $holidays[$holidayKey] ?? null,
      'isSaturday' => $dayOfWeek == 6,
      'isSunday' => $dayOfWeek == 0,
    ];
  }

  return $oneWeekDatesWithHolidays;
}

// この関数を呼び出して1週間の日付と祝日の情報を取得
$datesWithHoliday = getOneWeekDatesWithHolidays();

function getWeatherInfo($weatherCode)
{
  // プラグインの画像パスを指定
  // 注意: このパスはプラグインの構造に合わせて適宜調整してください。
  $pluginImagePaths = JWEATHERCUSTOMIZER_URL . 'images/';
  // error_log("Plugin image paths: " . $pluginImagePaths);

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

function validateTemperature($temperature)
{
  // 温度データが数値であることを検証
  return is_numeric($temperature) && is_finite($temperature);
}


function fetchWeatherDataWithCache($apiUrl, $cacheFile = 'weather_cache.json', $cacheTime = 14400)
{
  $dataFromCache = true; // データがキャッシュから取得されたかどうかを追跡するフラグ

  if (file_exists($cacheFile) && (filemtime($cacheFile) + $cacheTime > time())) {
    // キャッシュが有効な場合、キャッシュからデータを読み込む
    $data = json_decode(file_get_contents($cacheFile), true);
  } else {
    // キャッシュが無効または存在しない場合、APIからデータを取得
    $response = file_get_contents($apiUrl);
    $data = json_decode($response, true);
    // 取得したデータをキャッシュファイルに保存
    file_put_contents($cacheFile, json_encode($data));
    $dataFromCache = false; // APIから新たにデータを取得したため、フラグを更新
  }

  // デバッグ情報をエラーログに出力
  if ($dataFromCache) {
    // error_log("Weather data fetched from cache: " . print_r($data, true));
  } else {
    // error_log("Weather data fetched from API and updated cache: " . print_r($data, true));
  }

  $weatherCodesForWeek = $data['daily']['weathercode'];
  $weatherNamesForWeek = array_map(function ($code) {
    $info = getWeatherInfo($code); // getWeatherInfo()がコードに基づいて天気情報を返すように定義されていることを確認してください
    return $info['label'];
  }, $weatherCodesForWeek);
  $weatherImageForWeek = array_map(function ($code) {
    $info = getWeatherInfo($code);
    return sanitizeImageUrl($info['icon']); // sanitizeImageUrl()が画像URLを適切にサニタイズするように定義されていることを確認してください
  }, $weatherCodesForWeek);
  $highestTemperatureForWeek = array_map(function ($temp) {
    return validateTemperature($temp) ? $temp : null; // validateTemperature()が温度を適切に検証するように定義されていることを確認してください
  }, $data['daily']['temperature_2m_max']);

  $lowestTemperatureForWeek = array_map(function ($temp) {
    return validateTemperature($temp) ? $temp : null;
  }, $data['daily']['temperature_2m_min']);
  $highestTemperatureDifferencesForWeek = [];
  $lowestTemperatureDifferencesForWeek = [];
  $rainProbability1 = [];

  for ($i = -1; $i < count($highestTemperatureForWeek) - 1; $i++) {
    $todayMaxTemperature = $highestTemperatureForWeek[$i + 1];
    $yesterdayMaxTemperature = $highestTemperatureForWeek[$i + 1];
    $temperatureDifference = ceil(($todayMaxTemperature - $yesterdayMaxTemperature) * 10) / 10;
    $formattedDifference = $temperatureDifference >= 0 ? "(+{$temperatureDifference})" : "(-" . abs($temperatureDifference) . ")";

    $highestTemperatureDifferencesForWeek[] = $formattedDifference;
  };

  for ($i = -1; $i < count($lowestTemperatureForWeek) - 1; $i++) {
    $todayMinTemperature = $lowestTemperatureForWeek[$i + 1];
    $yesterdayMinTemperature = $lowestTemperatureForWeek[$i + 1];
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
        'maximumTemperatureComparison' => $highestTemperatureDifferencesForWeek[$index + 1], // null合体演算子を使用して、インデックスが存在しない場合に備える
        'lowestTemperatureComparison' => $lowestTemperatureDifferencesForWeek[$index + 2] ?? null,
        'rainProbability' => $rainProbability1[$index + 2] ?? null, // インデックス調整 (+1 されているので存在しない場合に備える)
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
