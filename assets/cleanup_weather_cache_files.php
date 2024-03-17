<?php

function JWeatherCustomizer_checkAndClearCacheIfNecessary()
{
  $cacheDir = JWEATHERCUSTOMIZER_CACHE_DIR; // キャッシュディレクトリのパス
  $files = glob($cacheDir . '*'); // ディレクトリ内の全ファイルを取得
  $fileCount = count($files); // ファイルの数をカウント
  $threshold = 10; // ファイル数の閾値
  $expiration = 14410; // キャッシュの有効期限（秒）

  if ($fileCount <= $threshold) {
    // ファイル数が閾値以下の場合、期限切れファイルのみをチェック
    foreach ($files as $file) {
      if (is_file($file) && (time() - filemtime($file)) > $expiration) {
        unlink($file); // 期限切れファイルを削除
      }
    }
  } else {
    // ファイル数が閾値を超えた場合、古いファイルから順に削除
    array_multisort(array_map('filemtime', $files), SORT_NUMERIC, SORT_ASC, $files);
    $filesToDelete = count($files) - $threshold;

    foreach ($files as $file) {
      if ($filesToDelete-- > 0) {
        unlink($file); // ファイルを削除
      } else {
        break; // 残りのファイルは保持
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
