<?

function fetchHolidaysWithCache()
{
	// キャッシュディレクトリとファイル名を指定
	$cacheFile = 'holidays_cache.json';
	$cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile; 
	$cacheDuration = 86400; // 24時間を秒で指定

	// キャッシュの有効性を確認し、有効であればキャッシュから、そうでなければAPIからデータを取得
	return fetchDataWithCache(HOLIDAYS_API_URL, $cachePath, $cacheDuration);
}
