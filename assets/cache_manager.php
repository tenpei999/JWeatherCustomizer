<?

include 'weather_api_client.php';

/**
 * Sanitizes a unique ID by removing any characters that are not alphanumeric, dashes, or underscores.
 * 
 * @param string $uniqueID The unique ID to sanitize.
 * @return string The sanitized unique ID.
 */
function sanitizeUniqueID($uniqueID)
{
  return preg_replace('/[^a-zA-Z0-9_-]/', '', $uniqueID);
}

/**
 * Fetches data from the specified API URL using cURL and returns it as an associative array.
 * 
 * @param string $apiUrl The URL of the API to fetch data from.
 * @return mixed The decoded JSON data as an associative array, or false on failure.
 */
function fetchApiData($apiUrl)
{
  $curl = curl_init();
  curl_setopt_array($curl, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => true
  ]);

  $response = curl_exec($curl);
  if ($response === false) {
    logMessage("API request failed for URL: " . $apiUrl . " Error: " . curl_error($curl));
    curl_close($curl);
    return false;
  }
  curl_close($curl);
  return json_decode($response, true);
}

/**
 * Checks if there is valid cached data for a given API URL and unique ID. If not, it fetches new data.
 * 
 * @param string $apiUrl The URL of the API to fetch data from if the cache is invalid.
 * @param string $uniqueID A unique identifier for the cache file.
 * @return array The data from the cache or newly fetched data.
 */
function checkWeatherCache($apiUrl, $uniqueID)
{
  $uniqueID = sanitizeUniqueID($uniqueID);
  $cacheFile = 'weather_cache_' . $uniqueID . '.json';
  $cacheTime = JWEATHERCUSTOMIZER_WEATHER_CACHE_DURATION;
  $cacheFilePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  $apiUrl = $apiUrl ?: JWEATHERCUSTOMIZER_DEFAULT_WEATHER_API_URL;
  $cacheData = getCacheData($cacheFile);

  if (
    file_exists($cacheFilePath) && $cacheData && $cacheData['url'] === $apiUrl &&
    (time() - filemtime($cacheFilePath)) < $cacheTime &&
    date('Y-m-d', filemtime($cacheFilePath)) == date('Y-m-d')
    && $cacheData['url'] === $apiUrl
  ) {
    return $cacheData['data'];
  } else {
    clearstatcache();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $apiResponse = curl_exec($ch);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode != 200) {
      logMessage("API request returned HTTP code " . $httpCode . " for URL: " . $apiUrl);
      curl_close($ch);
      return [];
    }

    curl_close($ch);
    $data = json_decode($apiResponse, true);
    if ($data === false) return [];

    saveCacheData($cacheFile, ['url' => $apiUrl, 'data' => $data]);
    return $data;
  }
}

/**
 * Retrieves and decodes the cached data from a specified cache file.
 * 
 * @param string $cacheFile The cache file name.
 * @return mixed The decoded cache data, or false if the cache file does not exist or is unreadable.
 */
function getCacheData($cacheFile)
{
  jweathercustomizer_ensure_cache_directory_exists();
  $cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  if (file_exists($cachePath) && is_readable($cachePath)) {
    $jsonData = file_get_contents($cachePath);
    return json_decode($jsonData, true);
  } else {
    return false;
  }
}

/**
 * Saves data to a specified cache file.
 * 
 * @param string $cacheFile The cache file name to save the data in.
 * @param mixed $data The data to cache.
 */
function saveCacheData($cacheFile, $data)
{
  jweathercustomizer_ensure_cache_directory_exists();
  $cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  $jsonData = json_encode($data);
  if (file_put_contents($cachePath, $jsonData)) {
    logMessage("Failed to save cache data to " . $cachePath);
  } else {
  }
}

/**
 * Fetches data using the given URL with cache support.
 * 
 * @param string $url The API URL to fetch data from.
 * @param string $cachePath The path to the cache file.
 * @param int $cacheDuration The duration for which the cache is considered valid.
 * @return array The fetched or cached data.
 */
function fetchDataWithCache($url, $cachePath = 'holidays_cache.json', $cacheDuration = JWEATHERCUSTOMIZER_WEATHER_CACHE_DURATION)
{
  if (isCacheValid($cachePath, $cacheDuration)) {
    $data = json_decode(file_get_contents($cachePath), true);
  } else {
    $data = fetchDataFromApi($url);
    if ($data) {
      file_put_contents($cachePath, json_encode($data));
    }
  }

  return $data ?? [];
}

/**
 * Checks if a cache file is valid based on its last modification time and a specified duration.
 * 
 * @param string $cachePath The path to the cache file.
 * @param int $cacheDuration The duration (in seconds) for which the cache is considered valid.
 * @return bool Returns true if the cache is valid, otherwise false.
 */
function isCacheValid($cachePath, $cacheDuration)
{
  return file_exists($cachePath) && (time() - filemtime($cachePath) < $cacheDuration);
}

/**
 * Logs a message with a timestamp to the PHP error log.
 * 
 * @param string $message The message to log.
 */
function logMessage($message)
{
  error_log("[" . date('Y-m-d H:i:s') . "] " . $message);
}
