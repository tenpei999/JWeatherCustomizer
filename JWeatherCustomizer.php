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
		'pluginImagePath' => plugins_url('images/', __FILE__),
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

function save_weather_data(WP_REST_Request $request)
{
	$nonce = $request->get_header('X-WP-Nonce');
	if (!wp_verify_nonce($nonce, 'wp_rest')) {
		return new WP_Error('rest_forbidden', esc_html__('You do not have permission to save data.', 'JWeatherCustomizer'), array('status' => 401));
	};
	error_log('Nonce verification succeeded');

	$data = $request->get_param('dailyData');

	if (!$data) {
		error_log('Error: No data provided');
		return new WP_REST_Response('Error: No data provided', 400);
	}

	if (!is_array($data)) {
		// error_log('Error: Invalid data format, expected array');
		return new WP_REST_Response('Error: Invalid data format', 400);
	}

	foreach ($data as $day => $value) {
		// error_log("Processing day: $day");
		if (!is_string($value)) {
			if (is_array($value)) {
				$sanitized_value = array_map('sanitize_text_field', $value);
				// error_log("Sanitized value for $day: " . print_r($sanitized_value, true));
			} else {
				// error_log("Error: Each item of dailyData must be a JSON string or an array.");
				return new WP_REST_Response('Error: Each item of dailyData must be a JSON string or an array.', 400);
			}
		} else {
			$decoded_value = json_decode($value, true);
			if (json_last_error() === JSON_ERROR_NONE) {
				$sanitized_value = array_map('sanitize_text_field', $decoded_value);
				// error_log("Decoded and sanitized value for $day: " . print_r($sanitized_value, true));
			} else {
				// error_log("Error: Invalid JSON string provided for day $day");
				return new WP_REST_Response('Error: Invalid JSON string provided for day ' . esc_html($day), 400);
			}
		}
		$data[$day] = $sanitized_value;
	}
}

function JWeatherCustomizer_frontend_scripts()
{
	// ブロックが存在するページのみでスクリプトを読み込む
	if (has_block('create-block/j-weather-customizer')) {
		wp_enqueue_script(
			'JWeatherCustomizer-frontend-script',
			plugins_url('JWeatherCustomizer') . '/frontScript/frontend.js', // 正確なパスに変更してください
			array(), // 依存関係がある場合はここに記載
			'1.0',
			true // スクリプトをフッターに配置
		);
	}
}
add_action('wp_enqueue_scripts', 'JWeatherCustomizer_frontend_scripts');

add_action('wp_loaded', 'checkWeatherCache');

function checkWeatherCache()
{
	$cacheFile = WP_CONTENT_DIR . '/uploads/weather_cache.json';

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

function getCacheData($cacheFile)
{
	if (file_exists($cacheFile) && is_readable($cacheFile)) {
		$jsonData = file_get_contents($cacheFile);
		return json_decode($jsonData, true);
	}
	return false;
}

function saveCacheData($cacheFile, $data)
{
	$jsonData = json_encode($data);
	file_put_contents($cacheFile, $jsonData);
}
