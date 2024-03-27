<?

/**
 * Fetches holiday information, utilizing caching to reduce API calls. This function attempts to read from
 * a cache file first; if the cache is either expired or not found, it fetches data from the API and updates the cache.
 * 
 * @return mixed An associative array of holiday data, or null if the fetch fails.
 */
function fetchHolidaysWithCache()
{
	$cacheFile = 'holidays_cache.json';
	$cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . DIRECTORY_SEPARATOR . $cacheFile;
	$cacheDuration = 86400;

	if (file_exists($cachePath) && (time() - filemtime($cachePath) < $cacheDuration)) {
		$cacheContent = file_get_contents($cachePath);
		if ($cacheContent !== false) {
			$data = json_decode($cacheContent, true);
			if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
				return $data;
			}
		}
	}

	$data = fetchDataWithCache(JWEATHERCUSTOMIZER_HOLIDAYS_API_URL, $cachePath, $cacheDuration);
	if ($data !== null) {
		file_put_contents($cachePath, json_encode($data));
	}

	return $data;
}
