<?

include 'weather_api_client.php';

function sanitizeUniqueID($uniqueID)
{
  return preg_replace('/[^a-zA-Z0-9_-]/', '', $uniqueID);
}

function fetchApiData($apiUrl)
{
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $apiUrl);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
  $response = curl_exec($curl);
  if ($response === false) {
    logMessage("API request failed for URL: " . $apiUrl . " Error: " . curl_error($curl));
    curl_close($curl);
    return false;
  }
  curl_close($curl);
  return json_decode($response, true);
}
function checkWeatherCache($apiUrl, $uniqueID)
{
  $uniqueID = sanitizeUniqueID($uniqueID); 
  $cacheFile = 'weather_cache_' . $uniqueID . '.json';
  $cacheTime = 14400;
  $cacheFilePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  $defaultApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14';
  $apiUrl = $apiUrl ?: $defaultApiUrl;
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

    if ($apiResponse === FALSE) {
      logMessage("API request failed for URL: " . $apiUrl);
      return [];
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode != 200) {
      logMessage("API request returned HTTP code " . $httpCode . " for URL: " . $apiUrl);
      curl_close($ch);
      return [];
    }

    curl_close($ch);
    $data = json_decode($apiResponse, true);
    if ($data === null) {
      logMessage("Failed to decode JSON response from URL: " . $apiUrl);
      return [];
    }

    saveCacheData($cacheFile, ['url' => $apiUrl, 'data' => $data]);
    return $data;
  }
}

function getCacheData($cacheFile)
{
  ensureCacheDirectoryExists(); 
  $cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  if (file_exists($cachePath) && is_readable($cachePath)) {
    $jsonData = file_get_contents($cachePath);
    return json_decode($jsonData, true);
  } else {
    return false;
  }
}

function saveCacheData($cacheFile, $data)
{
  ensureCacheDirectoryExists(); 
  $cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  $jsonData = json_encode($data);
  if (file_put_contents($cachePath, $jsonData)) {
    logMessage("Failed to save cache data to " . $cachePath);
  } else {
  }
}

function fetchDataWithCache($url, $cachePath = 'holidays_cache.json', $cacheDuration = 14400)
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

function isCacheValid($cachePath, $cacheDuration)
{
  if (file_exists($cachePath)) {
    $timeSinceLastModification = time() - filemtime($cachePath);
    if ($timeSinceLastModification < $cacheDuration) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function logMessage($message)
{
  error_log("[" . date('Y-m-d H:i:s') . "] " . $message);
}
