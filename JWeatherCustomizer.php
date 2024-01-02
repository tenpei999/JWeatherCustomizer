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
	}

	// $data = $request->get_param('dailyData');
	// // error_log(print_r($data, true)); 

	// if (!$data) {
	// 	return new WP_REST_Response('Error: No data provided', 400);
	// }

	// if (!is_array($data)) {
	// 	return new WP_REST_Response('Error: Invalid data format', 400);
	// }

	// foreach ($data as $day => $value) {
	// 	if (!is_string($value)) {
	// 		if (is_array($value)) {
	// 			$sanitized_value = array_map('sanitize_text_field', $value);
	// 		} else {
	// 			return new WP_REST_Response('Error: Each item of dailyData must be a JSON string or an array.', 400);
	// 		}
	// 	} else {
	// 		$decoded_value = json_decode($value, true);
	// 		if (json_last_error() === JSON_ERROR_NONE) {
	// 			$sanitized_value = array_map('sanitize_text_field', $decoded_value);
	// 		} else {
	// 			return new WP_REST_Response('Error: Invalid JSON string provided for day ' . $day, 400);
	// 		}
	// 	}
	// 	$data[$day] = $sanitized_value;
	// }

	// オプションの存在を確認
	// $existing_data = get_option('jweather_customizer_data');
	// if ($existing_data === false) {
	// 	// オプションが存在しない場合は、新しいオプションを追加
	// 	$result = add_option('jweather_customizer_data', json_encode($data));
	// } else {
	// 	// オプションが存在する場合は、既存のオプションを更新
	// 	$result = update_option('jweather_customizer_data', json_encode($data));
	// }

	// // データベース操作（オプションの更新または追加）
	// $existing_data = get_option('jweather_customizer_data');
	// if ($existing_data === false) {
	// 	$result = add_option('jweather_customizer_data', json_encode($data));
	// } else {
	// 	$result = update_option('jweather_customizer_data', json_encode($data));
	// }

	// // データベース操作後のデバッグ情報をログに記録
	// if (!$result) {
	// 	global $wpdb;
	// 	error_log('Failed to save data. Database error: ' . $wpdb->last_error);
	// 	error_log('Data that failed to save: ' . print_r($data, true));
	// } else {
	// 	error_log('Data saved successfully');
	// }

	// // get_optionを使用してデータベースからオプションを取得
	// $weather_data_option = get_option('jweather_customizer_data');


	// // オプションの内容をログに出力して確認
	// if ($weather_data_option) {
	// 	error_log('Weather data option: ' . print_r($weather_data_option, true));
	// } else {
	// 	error_log('No weather data option found.');
	// }
}
