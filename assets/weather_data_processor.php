<?
include 'holiday_api_client.php';
include 'cache_manager.php';
include 'validation_functions.php';

/**
 * Generates an array of dates between two specified dates.
 *
 * @param string $startDate Starting date in 'Y-m-d' format.
 * @param string $endDate Ending date in 'Y-m-d' format.
 * @return array Array of dates between the start and end date.
 */
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

/**
 * Fetches dates for one week along with any holidays.
 *
 * @param bool $addBreak Determines whether to add breaks between days.
 * @return array Array containing dates of the week with holiday information.
 */
function getOneWeekDatesWithHolidays($addBreak = false)
{
  // Initialize cache and date range for one week
  $cache = [];
  $today = date('Y-m-d');
  $sixDaysLater = date('Y-m-d', strtotime("+6 days", strtotime($today)));

  // Get an array of dates for the one-week period
  $oneWeekDates = getDateRangeArray($today, $sixDaysLater);

  // Fetch holidays using cache
  $holidays = fetchHolidaysWithCache();

  // Map dates to their respective holiday information
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

$datesWithHoliday = getOneWeekDatesWithHolidays();

/**
 * Returns weather information based on the provided weather code.
 *
 * @param int $weatherCode Numeric code representing the weather condition.
 * @return array Array containing the label and icon URL for the weather condition.
 */
function getWeatherInfo($weatherCode)
{
  // Define the base path for weather condition icons
  $pluginImagePaths = JWEATHERCUSTOMIZER_URL . 'images/';

  // Map weather codes to their respective labels and icon URLs
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

  return ['label' => "ERROR", 'icon' => ""];
}

/**
 * Sanitizes a given URL to ensure it is valid.
 *
 * @param string $url The URL to be sanitized.
 * @return string The sanitized URL, or an empty string if invalid.
 */
function sanitizeImageUrl($url)
{
  $sanitizedUrl = filter_var($url, FILTER_VALIDATE_URL);

  return $sanitizedUrl ? $sanitizedUrl : '';
};

/**
 * Fetches weather data for a given API URL and unique ID, utilizing caching.
 * Validates the fetched weather data and processes it to extract and format
 * required information for display.
 *
 * @param string $apiUrl The API URL to fetch weather data from.
 * @param string $uniqueID A unique identifier for caching purposes.
 * @return array Array containing processed weather data for display.
 */
function fetchWeatherDataWithCache($apiUrl, $uniqueID)
{

  // Check cache for existing weather data and validate it
  $data = checkWeatherCache($apiUrl, $uniqueID);

  // Validate the retrieved data. If invalid, log a message and return an empty array.
  if (!validateWeatherData($data)) {
    logMessage("Weather data validation failed.");
    return [];
  }

  // Process and extract necessary weather information from the data.
  $weatherCodesForWeek = $data['daily']['weathercode'];
  $weatherNamesForWeek = array_map(function ($code) {
    $info = getWeatherInfo($code);
    return $info['label'];
  }, $weatherCodesForWeek);

  $weatherImageForWeek = array_map(function ($code) {
    $info = getWeatherInfo($code);
    return sanitizeImageUrl($info['icon']);
  }, $weatherCodesForWeek);

  // Validate and format temperature data.
  $highestTemperatureForWeek = array_map(function ($temp) {
    return validateTemperature($temp) ? $temp : null;
  }, $data['daily']['temperature_2m_max']);
  $lowestTemperatureForWeek = array_map(function ($temp) {
    return validateTemperature($temp) ? $temp : null;
  }, $data['daily']['temperature_2m_min']);

  // Calculate and format temperature differences for comparison.
  $highestTemperatureDifferencesForWeek = [];
  $lowestTemperatureDifferencesForWeek = [];

  // Prepare and format precipitation probability data for display.
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

  // Extract today's and tomorrow's weather, along with the remainder of the week.
  $todayWeather = [];
  $tomorrowWeather = [];
  $weeklyWeather = [];

  $datesWithHoliday = getOneWeekDatesWithHolidays();
  foreach ($datesWithHoliday as $index => $dateInfo) {
    if (isset($weatherNamesForWeek[$index])) {
      // Aggregate and prepare daily weather data for the week, incorporating the processed information.
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
      if (isset($dailyData[0])) {
        $todayWeather = $dailyData[0];
      }

      if (isset($dailyData[1])) {
        $tomorrowWeather = $dailyData[1];
      }

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
