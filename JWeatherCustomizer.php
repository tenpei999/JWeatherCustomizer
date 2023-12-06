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

function create_block_gutenpride_block_init()
{
	register_block_type(
		__DIR__ . '/build',
		[
			'render_callback' => 'jWeatherCustomizer_render_block',
		]
	);
}

add_action('init', 'create_block_gutenpride_block_init');


function enqueue_my_plugin_script()
{
	// スクリプトを登録します。ここでの 'my-plugin-script' はあなたのスクリプトハンドルです。
	wp_register_script('my-plugin-script', plugins_url('build/index.js', __FILE__), array('wp-blocks'), '1.0.0', true);

	// ブロックエディタ用のスクリプトを登録
	wp_register_script(
		'my-plugin-script',
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
	wp_localize_script('my-plugin-script', 'myPluginData', $plugin_data);

	// スクリプトをエンキューします。
	wp_enqueue_script('my-plugin-script');
}

add_action('admin_enqueue_scripts', 'enqueue_my_plugin_script');

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

	$data = $request->get_param('dailyData');

	if (!$data) {
		return new WP_REST_Response('Error: No data provided', 400);
	}

	if (!is_array($data)) {
		return new WP_REST_Response('Error: Invalid data format', 400);
	}

	foreach ($data as $day => $value) {
		// If the value is not a string, assume it's already a decoded array
		if (!is_string($value)) {
			// Check if value is an array, sanitize it directly
			if (is_array($value)) {
				$sanitized_value = array_map('sanitize_text_field', $value);
			} else {
				// If value is not an array or string, this is an error
				return new WP_REST_Response('Error: Each item of dailyData must be a JSON string or an array.', 400);
			}
		} else {
			// If the value is a string, decode it assuming it's a JSON string
			$decoded_value = json_decode($value, true);
			if (json_last_error() === JSON_ERROR_NONE) {
				// It's a valid JSON string, sanitize the array
				$sanitized_value = array_map('sanitize_text_field', $decoded_value);
			} else {
				// JSON decode failed, invalid JSON string
				return new WP_REST_Response('Error: Invalid JSON string provided for day ' . $day, 400);
			}
		}
		// Store sanitized value back in data
		$data[$day] = $sanitized_value;
	}

	// オプション値の存在をチェックする
	$existing_data = get_option('my_weather_data');
	if ($existing_data === false) {
		// オプションが存在しない場合は、新しいオプションを追加します。
		$result = add_option('my_weather_data', json_encode($data));
	} else {
		// オプションが存在する場合は、既存のオプションを更新します。
		$result = update_option('my_weather_data', json_encode($data));
	}

	// 更新または追加の結果に基づいてレスポンスを返します。
	if ($result) {
		return new WP_REST_Response(array('message' => 'Data saved successfully'), 200);
	} else {
		error_log('Error: Failed to update the option "my_weather_data".');
		return new WP_REST_Response('Error: Failed to save data', 500);
	}
}
