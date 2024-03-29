<?php

/**
 * Plugin Name:       JWeatherCustomizer
 * Description:       A plugin that allows you to display a weather forecast of your choice on your website.
 * Version:           1.2
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            tenpei999@gmail.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       JWeatherCustomizer
 *
 * @package           create-block
 */

// Define constants to avoid repetition of directory paths and URLs.
define('JWEATHERCUSTOMIZER_CACHE_DIR', plugin_dir_path(__FILE__) . 'JWeatherCustomizer_Cache/');
define('JWEATHERCUSTOMIZER_URL', plugin_dir_url(__FILE__));
define('JWEATHERCUSTOMIZER_HOLIDAYS_API_URL', 'https://holidays-jp.github.io/api/v1/date.json');
define('JWEATHERCUSTOMIZER_DEFAULT_WEATHER_API_URL', 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14');
define('JWEATHERCUSTOMIZER_WEATHER_CACHE_DURATION', 14400); 

// Include dependencies.
require_once dirname(__FILE__) . '/render-blocks.php';
require_once dirname(__FILE__) . '/assets/cleanup_weather_cache_files.php';

// Register block type and REST API routes.
add_action('init', 'JWeatherCustomizer_init');
add_action('rest_api_init', 'jweathercustomizer_register_routes');
register_deactivation_hook(__FILE__, 'JWeatherCustomizer_cleanup');
date_default_timezone_set('Asia/Tokyo');

/**
 * Initializes the block type and registers necessary scripts.
 */
function JWeatherCustomizer_init()
{
	register_block_type(
		__DIR__ . '/build',
		[
			'render_callback' => 'jWeatherCustomizer_render_block',
		]
	);
	wp_register_script(
		'j-weather-customizer-script',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks'),
		'1.0.0',
		true
	);

	wp_localize_script('j-weather-customizer-script', 'JWeatherCustomizerData', [
		'pluginImagePath' => plugin_dir_url(__FILE__) . 'images/',
		'restUrl'         => rest_url('j-weather-customizer/save-data/'),
		'nonce' => wp_create_nonce('wp_rest'),
		'siteUrl'         => get_site_url(),
		'creditsUrl' => plugin_dir_url(__FILE__) . 'assets/credits.php',
	]);
	wp_enqueue_script('j-weather-customizer-script');
}

/**
 * Registers REST API routes for the plugin.
 */
function  jweathercustomizer_register_routes()
{
	register_rest_route('j-weather-customizer', '/save-data/', array(
		'methods' => 'POST',
		'callback' => 'save_weather_data',
		'permission_callback' => function () {
			return current_user_can('edit_posts');
		}
	));
};

/**
 * Ensures the cache directory exists.
 */
function jweathercustomizer_ensure_cache_directory_exists()
{
	if (!file_exists(JWEATHERCUSTOMIZER_CACHE_DIR) || !is_dir(JWEATHERCUSTOMIZER_CACHE_DIR)) {
		if (!mkdir(JWEATHERCUSTOMIZER_CACHE_DIR, 0755, true)) {
			logMessage("Failed to create cache directory: " . JWEATHERCUSTOMIZER_CACHE_DIR);
			exit;
		}
	}
}

/**
 * Cleans up the cache directory upon plugin deactivation.
 */
function JWeatherCustomizer_cleanup()
{
	$cacheDir = plugin_dir_path(__FILE__) . 'JWeatherCustomizer_Cache/';
	JWeatherCustomizer_recursive_delete($cacheDir);
}

/**
 * Recursively deletes the contents of a directory.
 *
 * @param string $directory The path to the directory to delete.
 */

function JWeatherCustomizer_recursive_delete($directory)
{
	if (!file_exists($directory)) {
		return;
	}

	if (!is_dir($directory)) {
		unlink($directory);
		return;
	}

	$items = new FilesystemIterator($directory);
	foreach ($items as $item) {
		if ($item->isDir() && !$item->isLink()) {
			JWeatherCustomizer_recursive_delete($item->getPathname());
		} else {
			unlink($item->getPathname());
		}
	}
	rmdir($directory);
};

function JWeatherCustomizer_frontend_scripts() {
	// ブロックが存在するページのみでスクリプトを読み込む
	if ( has_block( 'create-block/j-weather-customizer' ) ) {
			wp_enqueue_script(
					'JWeatherCustomizer-frontend-script',
					JWEATHERCUSTOMIZER_URL . '/frontScript/frontend.js', // 正確なパスに変更してください
					array(), // 依存関係がある場合はここに記載
					'1.0',
					true // スクリプトをフッターに配置
			);
	}
}
add_action( 'wp_enqueue_scripts', 'JWeatherCustomizer_frontend_scripts' );
