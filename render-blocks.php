<?php

function fetchWeatherDataWithCache($apiUrl, $cacheFile = 'weather_cache.json', $cacheTime = 3600)
{
  $dataFromCache = true; // データがキャッシュから取得されたかどうかを追跡するフラグ

  if (file_exists($cacheFile) && (filemtime($cacheFile) + $cacheTime > time())) {
    // キャッシュが有効な場合、キャッシュからデータを読み込む
    $data = json_decode(file_get_contents($cacheFile), true);
  } else {
    // キャッシュが無効または存在しない場合、APIからデータを取得
    $response = file_get_contents($apiUrl);
    $data = json_decode($response, true);
    // 取得したデータをキャッシュファイルに保存
    file_put_contents($cacheFile, json_encode($data));
    $dataFromCache = false; // APIから新たにデータを取得したため、フラグを更新
  }

  // デバッグ情報をエラーログに出力
  if ($dataFromCache) {
    error_log("Weather data fetched from cache: " . print_r($data, true));
  } else {
    error_log("Weather data fetched from API and updated cache: " . print_r($data, true));
  }

  return $data;
}


function generateBorderStyle($borders, $borderRadiusValue)
{
  $styles = [];
  if ($borders) {
    foreach ($borders as $side => $border) {
      $styles[] = "border-" . esc_attr($side) . ": " . esc_attr($border['width']) . " " . esc_attr($border['style']) . " " . esc_attr($border['color']);
    }
  }
  if ($borderRadiusValue) {
    $styles[] = "border-radius: " . esc_attr($borderRadiusValue);
  }
  return implode('; ', $styles);
}

function generateBackgroundStyles($attr)
{
  $styles = [];
  switch ($attr['backgroundStyleType']) {
    case 'image':
      if ($attr['backgroundImage']) {
        $styles[] = 'background-image: url(' . esc_url($attr['backgroundImage']) . ')';
        $styles[] = 'background-size: cover';
        $styles[] = 'background-repeat: no-repeat';
        $styles[] = 'background-position: center';
      }
      break;
    case 'color':
      if ($attr['backgroundColor']) {
        $styles[] = 'background: ' . esc_attr($attr['backgroundColor']);
      }
      break;
    case 'gradient':
      if ($attr['backgroundGradient']) {
        $styles[] = 'background: ' . esc_attr($attr['backgroundGradient']);
      }
      break;
  }
  return implode('; ', $styles);
}
function jWeatherCustomizer_render_block($attr, $content)
{
  // API URLの設定 (ダミーのURLとして設定しています。実際のURLに置き換えてください)
  $apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14';
  // キャッシュファイルのパス
  $cacheFile = WP_CONTENT_DIR . '/uploads/weather_cache.json';

  // 天気データを取得
  $weatherData = fetchWeatherDataWithCache($apiUrl, $cacheFile);

  // 今日の天気データ、明日の天気データ、週間天気データを取得するロジックを実装
  // ここではダミーデータを使用
  $todayWeather = $weatherData['today'] ?? [];
  $tomorrowWeather = $weatherData['tomorrow'] ?? [];
  $weeklyWeather = $weatherData['weekly'] ?? [];
  error_log("Today weather: " . print_r($todayWeather, true));
  error_log("Tomorrow weather: " . print_r($tomorrowWeather, true));
  error_log("Weekly weather: " . print_r($weeklyWeather, true));

  
  $attr = array_merge([
    'showTodayWeather' => true,
    'showTomorrowWeather' => true,
    'showWeeklyWeather' => true,
    'showHoliday' => null,
    'showPrecipitation' => null,
    'borders' => null,
    'borderRadiusValue' => null,
    'fontFamily' => 'Noto Sans JP, sans-serif',
    'textColor' => 'black',
    'backgroundStyleType' => 'color',
    'backgroundImage' => '',
    'backgroundGradient' => '',
    'backgroundColor' => '#fff',
    'balanceOption' => 'EmphasizeTheWeather',
    'todayWeather' => [
      'type' => 'object',
      'default' => []
    ],
    'tomorrowWeather' => [
      'type' => 'object',
      'default' => []
    ],
    'weeklyWeather' => [
      'type' => 'array',
      'default' => []
    ],
  ], $attr);

  function setTextColor($day)
  {
    if ($day['isHoliday'] ?? false) {
      return ' style="color: red"';
    } elseif ($day['isSunday'] ?? false) {
      return ' style="color: red"';
    } elseif ($day['isSaturday'] ?? false) {
      return ' style="color: blue"';
    }
    return '';
  }

  // Styles
  $colorStyle = 'color: ' . esc_attr($attr['textColor']) . ';';
  $fontStyle = 'font-family: ' . esc_attr($attr['fontFamily']) . ';';
  $backgroundStyles = generateBackgroundStyles($attr);
  $borderStyles = generateBorderStyle($attr['borders'], $attr['borderRadiusValue']);
  $commonStyle = esc_attr($borderStyles) . ' ; ' . $colorStyle . ' ; ' . esc_attr($backgroundStyles) . ' ; ' . $fontStyle . ' ; ';


  // Output
  $output = '<div class="wp-block-create-block-j-weather-customizer" style="">';
  $output .= '<div class="layout"><div class="today-and-tomorrow weather-layout">';

  $time_ranges = ['0-6時', '6-12時', '12-18時', '18-24時'];


  if ($attr['showTodayWeather'] && isset($attr['todayWeather'])) {
    $data = $attr['todayWeather'];
    $textColor = setTextColor($data['day'] ?? []);

    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], esc_html__('今日の天気', 'j-weather-customizer'), $commonStyle, esc_attr($attr['balanceOption']));
  }

  if ($attr['showTomorrowWeather'] && isset($attr['tomorrowWeather'])) {
    $data = $attr['tomorrowWeather'];
    $textColor = setTextColor($data['day'] ?? []);
    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], esc_html__('明日の天気', 'j-weather-customizer'), $commonStyle, esc_attr($attr['balanceOption']));
  }

  $output .= '</div></div>';

  if ($attr['showWeeklyWeather'] && isset($attr['weeklyWeather']) && is_array($attr['weeklyWeather'])) {
    $output .= '<ul class="block--weekly weather-layout ' . esc_attr($attr['balanceOption']) . '" style="' . $commonStyle . '">';

    $maxDays = 4;
    foreach ($attr['weeklyWeather'] as $i => $dayWeather) {
      if ($i <= $maxDays) { // 0番目から5番目までの要素に対してのみ処理を実行
        $data = $attr['weeklyWeather'][$i]; // 週間天気データを $data に設定
        $textColor = setTextColor($data['day'] ?? []);
        $output .= generateWeeklyWeatherOutput($data, $textColor, $attr['showHoliday']); // 週間天気用の出力関数を呼び出し
      } else {
        break; // 5番目の要素を処理した後、ループから抜け出す
      }
    }
    $output .= '</ul>';
  }

  return $output;
}

function generateWeatherOutput($data, $textColor, $time_ranges, $showHoliday, $showPrecipitation, $title, $commonStyle, $selectedBalance)
{
}

function generateWeeklyWeatherOutput($data, $textColor, $showHoliday)
{
}
