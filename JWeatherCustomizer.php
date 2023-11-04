<?php

/**
 * Plugin Name:       JWeatherCustomizer
 * Plugin URI:        https://example.com/jweather-customizer
 * Description:       カスタム天気情報を表示するGutenbergブロック。
 * Version:           1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * Author URI:        https://wordpress.org/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jweather-customizer
 * Domain Path:       /languages
 *
 * @package           create-block
 */

// 直接アクセスを防ぐ。
if (!defined('ABSPATH')) {
	exit; // 直接アクセスされた場合は終了。
}

class JWeatherCustomizer
{

	/**
	 * コンストラクタ。
	 */
	public function __construct()
	{
		add_action('init', [$this, 'register_block']);
		add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
		add_action('rest_api_init', [$this, 'register_rest_routes']);
		include_once dirname(__FILE__) . '/render-blocks.php';
	}

	/**
	 * ブロックを登録します。`block.json`ファイルから読み込んだメタデータを使用します。
	 */
	public function register_block()
	{
		register_block_type_from_metadata(__DIR__ . '/build');
	}

	/**
	 * エディター用にブロックのアセットをキューに入れます。
	 */
	public function enqueue_scripts()
	{
		$script_handle = 'jweather-customizer-script';
		wp_register_script(
			$script_handle,
			plugins_url('/build/index.js', __FILE__),
			[],
			filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
			true
		);

		wp_enqueue_script($script_handle);

		// 新しいデータでスクリプトをローカライズします。
		$plugin_data = [
			'pluginImagePath' => plugins_url('images/', __FILE__),
			'restUrl'         => rest_url('j-weather-customizer/v1/save-data/'),
			'siteUrl'         => get_site_url(),
		];
		wp_localize_script($script_handle, 'myPluginData', $plugin_data);
	}

	/**
	 * REST APIルートを登録します。
	 */
	public function register_rest_routes()
	{
		register_rest_route('j-weather-customizer/v1', '/save-data/', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [$this, 'handle_save_data'],
			'permission_callback' => '__return_true',
			'args'                => [
				'dailyData' => [
					'required'          => true,
					'validate_callback' => function ($param, $request, $key) {
						return is_array($param);
					},
				],
			],
		]);
	}

	/**
	 * REST API呼び出しからデータを保存する処理を行います。
	 */
	public function handle_save_data(WP_REST_Request $request)
	{
		$data = $request->get_param('dailyData');
		if (!$data) {
			return new WP_REST_Response('エラー: データが提供されていません', 400);
		}

		$result = update_option('my_weather_data', json_encode($data));

		return $result ?
			new WP_REST_Response(['message' => '成功'], 200) :
			new WP_REST_Response(['message' => 'データの保存に失敗しました'], 500);
	}
}

// プラグインを初期化します。
new JWeatherCustomizer();
