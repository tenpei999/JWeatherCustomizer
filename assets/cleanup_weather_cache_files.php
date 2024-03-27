<?php

add_action('wp_loaded', 'JWeatherCustomizer_checkAndClearCacheIfNecessary');
add_action('save_post', 'trigger_cleanup_after_post_save', 10, 2);

// Clears expired or excess cache files based on predefined thresholds.
function JWeatherCustomizer_checkAndClearCacheIfNecessary()
{
  $cacheDir = JWEATHERCUSTOMIZER_CACHE_DIR;
  $files = glob($cacheDir . '*');
  $fileCount = count($files);
  $threshold = 10;
  $expiration = JWEATHERCUSTOMIZER_WEATHER_CACHE_DURATION + 10;

  if ($fileCount <= $threshold) {
    // Delete files only if they are expired.
    foreach ($files as $file) {
      if (is_file($file) && (time() - filemtime($file)) > $expiration) {
        unlink($file);
      }
    }
  } else {
    // Delete oldest files down to the threshold.
    array_multisort(array_map('filemtime', $files), SORT_NUMERIC, SORT_ASC, $files);
    $filesToDelete = count($files) - $threshold;

    foreach ($files as $file) {
      if ($filesToDelete-- > 0) {
        unlink($file);
      } else {
        break;
      }
    }
  }
}

// Retrieves unique IDs from block content.
function get_unique_ids_from_content($content)
{
  $blocks = parse_blocks($content);
  $uniqueIDs = array();

  foreach ($blocks as $block) {
    if (isset($block['attrs']['uniqueID'])) {
      $uniqueIDs[] = $block['attrs']['uniqueID'];
    }
  }

  return $uniqueIDs;
}

// Triggers cache cleanup after post save, for relevant post types only.
function trigger_cleanup_after_post_save($post_id, $post)
{
  if ('page' === $post->post_type || 'post' === $post->post_type) {
    $content = $post->post_content;
    $uniqueIDs = get_unique_ids_from_content($content);
    cleanup_weather_cache_files($uniqueIDs);
  }
}

// Cleans up weather cache files not related to current valid unique IDs.
function cleanup_weather_cache_files($validUniqueIDs)
{
  $cacheDir = JWEATHERCUSTOMIZER_CACHE_DIR;

  foreach (glob($cacheDir . 'weather_cache_*.json') as $file) {
    if (preg_match('/weather_cache_(.+)\.json$/', basename($file), $matches)) {
      $fileUniqueID = $matches[1];

      // Delete the file if its unique ID is not in the list of valid IDs.
      if (!in_array($fileUniqueID, $validUniqueIDs)) {
        unlink($file);
      }
    }
  }
}
