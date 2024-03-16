<?

include 'weather_api_client.php';

function checkWeatherCache($apiUrl, $uniqueID)
{
  $cacheFile = 'weather_cache_' . $uniqueID . '.json';
  // この一意のキーをファイル名に含める
  $cacheTime = 14400; // 4時間（秒単位）
  $cacheFilePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  // デフォルトのAPI URL
  $defaultApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14';
  $apiUrl = $apiUrl ?: $defaultApiUrl;

  // キャッシュデータを取得する関数
  $cacheData = getCacheData($cacheFile);
  error_log("casheDateUrl" . $cacheData['url']);
  error_log("apiUrl" . $apiUrl);
  error_log($cacheData['url'] === $apiUrl);

  if (
    file_exists($cacheFilePath) && $cacheData && $cacheData['url'] === $apiUrl &&
    (time() - filemtime($cacheFilePath)) < $cacheTime &&
    date('Y-m-d', filemtime($cacheFilePath)) == date('Y-m-d')
    && $cacheData['url'] === $apiUrl
  ) {
    // キャッシュデータが存在し、有効な場合はキャッシュからデータを返す
    return $cacheData['data'];
  } else {
    // キャッシュの状態を再確認
    clearstatcache(); // キャッシュされたファイル状態情報をクリア
    
      // 新しいURLでAPIからデータを取得してキャッシュを更新
      $apiResponse = file_get_contents($apiUrl);
    if ($apiResponse === FALSE) {
      logMessage("API request failed for URL: " . $apiUrl);
      return [];
    }
    $data = json_decode($apiResponse, true);
    if ($data === NULL) {
      logMessage("Failed to decode JSON response from URL: " . $apiUrl);
      return [];
    }

    // URLが変更された場合やキャッシュが無効の場合はキャッシュを更新
    saveCacheData($cacheFile, ['url' => $apiUrl, 'data' => $data]);
    return $data;
  }
}


// キャッシュデータを取得する関数
function getCacheData($cacheFile)
{
  ensureCacheDirectoryExists(); // キャッシュディレクトリの確認と作成
  $cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  if (file_exists($cachePath) && is_readable($cachePath)) {
    $jsonData = file_get_contents($cachePath);
    return json_decode($jsonData, true);
  } else {
    return false;
  }
}

// キャッシュデータを保存する関数
function saveCacheData($cacheFile, $data)
{
  ensureCacheDirectoryExists(); // キャッシュディレクトリの確認と作成
  $cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  $jsonData = json_encode($data);
  if (file_put_contents($cachePath, $jsonData)) {
    logMessage("Failed to save cache data to " . $cachePath);
  } else {
  }
}

/**
 * データをキャッシュから取得またはAPIから取得する。
 *
 * @param string $url APIのURL。
 * @param string $cachePath キャッシュファイルのパス。
 * @param int $cacheDuration キャッシュの有効期間（秒）。
 * @return array データを含む配列。
 */

function fetchDataWithCache($url, $cachePath = 'holidays_cache.json', $cacheDuration = 14400)
{
  // キャッシュが有効かどうかを確認
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
 * キャッシュが有効かどうかをチェックする。
 *
 * @param string $cachePath キャッシュファイルのパス。
 * @param int $cacheDuration キャッシュの有効期間（秒）。
 * @return bool キャッシュが有効な場合はtrue、それ以外の場合はfalse。
 */

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

/**
 * メッセージをログに記録する。
 *
 * @param string $message ログに記録するメッセージ。
 */

function logMessage($message)
{
  error_log("[" . date('Y-m-d H:i:s') . "] " . $message);
}
