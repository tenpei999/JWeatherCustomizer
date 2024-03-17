<?

function fetchHolidaysWithCache()
{
	// キャッシュディレクトリとファイル名を指定
	$cacheFile = 'holidays_cache.json';
	$cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . DIRECTORY_SEPARATOR . $cacheFile; 
	$cacheDuration = 86400; // 24時間を秒で指定

	// キャッシュファイルが存在し、かつ最終更新時刻から$cacheDuration秒以内であればキャッシュを使用
	if (file_exists($cachePath) && (time() - filemtime($cachePath) < $cacheDuration)) {
		$cacheContent = file_get_contents($cachePath);
		if ($cacheContent !== false) {
			$data = json_decode($cacheContent, true);
			if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
				return $data; // 検証済みのキャッシュデータを返す
			}
		}
	}

	// キャッシュが利用できない場合はAPIからデータを取得
	$data = fetchDataWithCache(HOLIDAYS_API_URL, $cachePath, $cacheDuration);
	if ($data !== null) {
		// 新たに取得したデータをキャッシュに保存
		file_put_contents($cachePath, json_encode($data));
	}

	return $data;
}
