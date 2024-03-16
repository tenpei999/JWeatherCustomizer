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

define('JWEATHERCUSTOMIZER_CACHE_DIR', plugin_dir_path(__FILE__) . 'JWeatherCustomizer_Cache/');
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

// ディレクトリが存在しない場合に作成する関数
function ensureCacheDirectoryExists()
{
	if (!file_exists(JWEATHERCUSTOMIZER_CACHE_DIR)) {
		mkdir(JWEATHERCUSTOMIZER_CACHE_DIR, 0755, true);
	}
}

// タイムゾーンを日本時間に設定
date_default_timezone_set('Asia/Tokyo');

// プラグインの無効化時に実行される関数を登録
register_deactivation_hook(__FILE__, 'JWeatherCustomizer_cleanup');

function JWeatherCustomizer_cleanup()
{
	// 削除したいディレクトリのパス
	$cacheDir = plugin_dir_path(__FILE__) . 'JWeatherCustomizer_Cache/';

	// ディレクトリを再帰的に削除するカスタム関数
	JWeatherCustomizer_recursive_delete($cacheDir);
}

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
}

function JWeatherCustomizer_checkAndClearCacheIfNecessary()
{
	$cacheDir = JWEATHERCUSTOMIZER_CACHE_DIR; // キャッシュディレクトリのパス
	$files = glob($cacheDir . '*'); // ディレクトリ内の全ファイルを取得
	$fileCount = count($files); // ファイルの数をカウント
	$threshold = 10; // ファイル数の閾値

	// ファイル数が閾値を超えた場合、全ファイルを削除
	if ($fileCount > $threshold) {
		foreach ($files as $file) {
			if (is_file($file)) {
				unlink($file); // ファイルを削除
			}
		}
	}
}

add_action('wp_loaded', 'JWeatherCustomizer_checkAndClearCacheIfNecessary');



add_action('save_post', 'trigger_cleanup_after_post_save', 10, 2);

function get_unique_ids_from_content($content)
{
  $blocks = parse_blocks($content);
  $uniqueIDs = array();

  foreach ($blocks as $block) {
    // ここで、特定のブロックタイプを指定することもできます
    // if ($block['blockName'] === 'namespace/block-name') {...}
    if (isset($block['attrs']['uniqueID'])) {
      $uniqueIDs[] = $block['attrs']['uniqueID'];
    }
  }

  return $uniqueIDs;
}


function trigger_cleanup_after_post_save($post_id, $post)
{
  error_log("trigger_cleanup_after_post_save called for post ID: " . $post_id); 
  // 投稿タイプをチェックして、特定のタイプの投稿でのみ実行
  if ('page' === $post->post_type || 'post' === $post->post_type) {
    $content = $post->post_content;
    $uniqueIDs = get_unique_ids_from_content($content);
    cleanup_weather_cache_files($uniqueIDs);
  }
}

function cleanup_weather_cache_files($validUniqueIDs)
{
  $cacheDir = JWEATHERCUSTOMIZER_CACHE_DIR;
  error_log("Valid Unique IDs: " . implode(", ", $validUniqueIDs));

  foreach (glob($cacheDir . 'weather_cache_*.json') as $file) {
    if (preg_match('/weather_cache_(.+)\.json$/', basename($file), $matches)) {
      $fileUniqueID = $matches[1];

      if (!in_array($fileUniqueID, $validUniqueIDs)) {
        unlink($file);
      }
    }
  }
}
