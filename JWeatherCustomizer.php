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
}
