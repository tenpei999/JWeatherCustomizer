<?php

/**
 * Plugin Name:       JWeatherCustomizer
 * Description:       A plugin that allows you to display a weather forecast of your choice on your website.
 * Version:           1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            tenpei999@gmail.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       JWeatherCustomizer
 *
 * @package           create-block
 */

define('JWEATHERCUSTOMIZER_CACHE_DIR', WP_CONTENT_DIR . '/uploads/JWeatherCustomizer_Cache/');
define('JWEATHERCUSTOMIZER_URL', plugin_dir_url(__FILE__));
define('HOLIDAYS_API_URL', 'https://holidays-jp.github.io/api/v1/date.json');


function create_block_JWeatherCustomizer_block_init()
{
	register_block_type(
		__DIR__ . '/build',
		[
			'render_callback' => 'jWeatherCustomizer_render_block',
		]
	);
}

add_action('init', 'create_block_JWeatherCustomizer_block_init');


function test_rest_url()
{
	$url = rest_url('j-weather-customizer/save-data/');
}
add_action('init', 'test_rest_url');

function enqueue_jWeatherCustomizer_script()
{
	// ブロックエディタ用のスクリプトを登録
	wp_register_script(
		'j-weather-customizer-script',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks'), // 必要に応じて依存関係を記述
		'1.0.0',
		true
	);

	// データをローカライズしてセキュアな方法でスクリプトに渡します。
	$plugin_data = array(
		'pluginImagePath' => plugin_dir_url(__FILE__) . 'images/',
		'restUrl'         => rest_url('j-weather-customizer/save-data/'),
		'nonce' => wp_create_nonce('wp_rest'),
		'siteUrl'         => get_site_url(),
	);

	// ローカライズスクリプト
	wp_localize_script('j-weather-customizer-script', 'JWeatherCustomizerData', $plugin_data);

	// スクリプトをエンキューします。
	wp_enqueue_script('j-weather-customizer-script');
}

add_action('admin_enqueue_scripts', 'enqueue_jWeatherCustomizer_script');

include dirname(__FILE__) . '/render-blocks.php';

add_action('rest_api_init', function () {
	register_rest_route('j-weather-customizer', '/save-data/', array(
		'methods' => 'POST',
		'callback' => 'save_weather_data',
		'permission_callback' => function () {
			return current_user_can('edit_posts');
		}
	));
});

add_action('wp_loaded', 'checkWeatherCache');


// ディレクトリが存在しない場合に作成する関数
function ensureCacheDirectoryExists()
{
	if (!file_exists(JWEATHERCUSTOMIZER_CACHE_DIR)) {
		mkdir(JWEATHERCUSTOMIZER_CACHE_DIR, 0755, true);
	}
}

function checkWeatherCache()
{
	$cacheFile = JWEATHERCUSTOMIZER_CACHE_DIR . 'weather_cache.json';

	// キャッシュデータを取得する関数
	$data = getCacheData($cacheFile);

	if ($data) {
		// キャッシュデータが存在する場合の処理
		error_log('hoge'); // debug.logにメッセージを出力
	} else {
		// キャッシュデータが存在しない場合の処理
		// ここで外部APIからデータを取得する仮定のコード
		$apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14"; // APIのURL
		$apiResponse = file_get_contents($apiUrl);
		$data = json_decode($apiResponse, true);

		// 取得したデータをキャッシュに保存
		saveCacheData($cacheFile, $data);

		error_log('huga'); // debug.logにメッセージを出力
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

// タイムゾーンを日本時間に設定
date_default_timezone_set('Asia/Tokyo');

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
 * APIからデータを取得する。
 *
 * @param string $url APIのURL。
 * @return array|null データを含む配列、またはエラーが発生した場合はnull。
 */

function fetchDataFromApi($url)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	$err = curl_error($ch);
	curl_close($ch);

	if ($err) {
		logMessage("cURL Error: " . $err);
		return null;
	} else {
		return json_decode($response, true);
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

// 定数の定義

function fetchHolidaysWithCache()
{
	// キャッシュディレクトリとファイル名を指定
	$cacheFile = 'holidays_cache.json';
	$cachePath = JWEATHERCUSTOMIZER_CACHE_DIR . $cacheFile; // 修正後のキャッシュディレクトリパス
	$cacheDuration = 86400; // 24時間を秒で指定

	// キャッシュの有効性を確認し、有効であればキャッシュから、そうでなければAPIからデータを取得
	return fetchDataWithCache(HOLIDAYS_API_URL, $cachePath, $cacheDuration);
}
