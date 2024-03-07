<?

include 'weather_api_client.php';

function checkWeatherCache($apiUrl)
{
  error_log('API URL: ' . $apiUrl);
  if (empty($apiUrl)) {
    error_log('Error: API URL is empty.');
  }
  // キャッシュファイル名とキャッシュの有効期間を関数内で定義
  $cacheFile = 'weather_cache.json';
  $cacheTime = 14400; // 4時間
  $cacheFilePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile;
  $apiUrl = $apiUrl ?: 'https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.78&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&current_weather=true';

  // キャッシュデータを取得する関数
  $cacheData = getCacheData($cacheFile);

  if ($cacheData && $cacheData['url'] === $apiUrl && time() - filemtime($cacheFilePath) < $cacheTime && !empty($cacheData['data'])) {
    // キャッシュデータが存在する場合の処理
    return $cacheData['data'];
  } else {
    // キャッシュデータが存在しない場合の処理
    // 属性からURLを取得

    // error_log("Fetching weather data from API URL: " . $apiUrl);

    // apiUrlをdebug.logに記録

    $apiResponse = file_get_contents($apiUrl);
    $data = json_decode($apiResponse, true);

    // 新しいデータとURLをキャッシュに保存
    saveCacheData($cacheFile, ['url' => $apiUrl, 'data' => $data]);
    return $data;
  }
}
// キャッシュデータを取得する関数
function getCacheData($cacheFile)
{
  ensureCacheDirectoryExists(); // キャッシュディレクトリの確認と作成
  $cachePath = $cacheFile;
  if (file_exists($cachePath) && is_readable($cachePath)) {
    $jsonData = file_get_contents($cachePath);
    return json_decode($jsonData, true);
  }
  return false;
}

// キャッシュデータを保存する関数
function saveCacheData($cacheFile, $data)
{
  ensureCacheDirectoryExists(); // キャッシュディレクトリの確認と作成
  $cachePath = $cacheFile;
  $jsonData = json_encode($data);
  file_put_contents($cachePath, $jsonData);
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
    logMessage("Data fetched from cache.");
  } else {
    $data = fetchDataFromApi($url);
    if ($data) {
      file_put_contents($cachePath, json_encode($data));
      logMessage("Data fetched from API and cache updated.");
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
  return file_exists($cachePath) &&
    (time() - filemtime($cachePath) < $cacheDuration) &&
    date('Y-m-d', filemtime($cachePath)) == date('Y-m-d');
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

// ディレクトリが存在しない場合に作成する関数
function ensureCacheDirectoryExists()
{
  if (!file_exists(JWEATHERCUSTOMIZER_CACHE_DIR)) {
    mkdir(JWEATHERCUSTOMIZER_CACHE_DIR, 0755, true);
  }
}

// タイムゾーンを日本時間に設定
date_default_timezone_set('Asia/Tokyo');
