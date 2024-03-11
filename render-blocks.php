<?php

include 'assets/weather_data_processor.php';

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
    'selectedCity' => [
      'type' => 'object',
      'default' => [
        'name' => '東京',
        'url' => 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14'
      ]
    ],
  ], $attr);

  // API URLの設定 (ダミーのURLとして設定しています。実際のURLに置き換えてください)
  $apiUrl = $attr['selectedCity']['url'];
  // キャッシュファイルのパス
  $cacheFile = WP_CONTENT_DIR . '/uploads/weather_cache.json';

  // 天気データを取得
  $weatherData = fetchWeatherDataWithCache($apiUrl, $cacheFile);

  // 今日の天気データ、明日の天気データ、週間天気データを取得するロジックを実装
  $todayWeather = $weatherData['today'] ?? [];
  $tomorrowWeather = $weatherData['tomorrow'] ?? [];
  $weeklyWeather = $weatherData['weekly'] ?? [];

  // エラーログにデータを出力
  // error_log("Today's Weather: " . print_r($todayWeather, true));
  // error_log("Tomorrow's Weather: " . print_r($tomorrowWeather, true));
  // error_log("Weekly Weather: " . print_r($weeklyWeather, true));

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
    $data = $todayWeather;
    $textColor = setTextColor($data['day'] ?? []);

    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], esc_html__('今日の天気', 'j-weather-customizer'), $commonStyle, esc_attr($attr['balanceOption']));
  }

  if ($attr['showTomorrowWeather'] && isset($attr['tomorrowWeather'])) {
    $data = $tomorrowWeather;
    $textColor = setTextColor($data['day'] ?? []);
    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], esc_html__('明日の天気', 'j-weather-customizer'), $commonStyle, esc_attr($attr['balanceOption']));
  }

  $output .= '</div></div>';

  if ($attr['showWeeklyWeather'] && isset($weeklyWeather) && is_array($weeklyWeather)) {
    $output .= '<ul class="block--weekly weather-layout ' . esc_attr($attr['balanceOption']) . '" style="' . $commonStyle . '">';

    $maxDays = 4;
    foreach ($weeklyWeather as $i => $dayWeather) {
      if ($i <= $maxDays) { // 0番目から5番目までの要素に対してのみ処理を実行
        $data = $weeklyWeather[$i]; // 週間天気データを $data に設定
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
  $output = '<div class="block--current ' . esc_attr($selectedBalance) . '" style="' . $commonStyle . '">';
  $output .= '<h3>' . $title . '</h3>';
  $output .= '<h4' . $textColor . '>' . ($data['day']['date']['month'] ?? '') . ($data['day']['date']['day'] ?? '') . '<br/>' . ($data['day']['date']['dayOfWeek']  ?? '') . '</h4>';
  if ($showHoliday) {
    $output .= '<p>' . esc_html($data['day']['holidayName'] ?? '') . '</p>';
  }
  $output .= '<p class="weather__name">' . ($data['name'] ?? '')  . '</p>';
  $output .= "<img src=\"{$data['image']}\" alt=\"weather icon\">";
  $output .= '<ul class="temp">';
  $output .= '<li class="highestAndComparison">';
  $output .= '<p class="highest">' . ($data['highestTemperature'] ?? '') . '<span class="celsius">℃</span></p>';
  $output .= '<p class="comparison">' . ($data['maximumTemperatureComparison'] ?? '') . '</p>';
  $output .= '</li>';
  $output .= '<li class="lowestAndComparison">';
  $output .= '<p class="lowest">' . ($data['lowestTemperature'] ?? '') . '<span class="celsius">℃</span></p>';
  $output .= '<p class="comparison">' . ($data['lowestTemperatureComparison'] ?? '') . '</p>';
  $output .= '</li>';
  $output .= '</ul>';
  if ($showPrecipitation && isset($data['rainProbability']) && is_array($data['rainProbability'])) {
    $output .= '<ul class="time-zone">';
    $output .= '<li class="c-weather__chanceOfRain-index"><p class="time">時間</p><p class="rain">降水</p></li>';
    for ($i = 0; $i < 4; $i++) {
      $output .= '<li class="c-weather__chanceOfRain-timezone' . ($i + 1) . '">';
      $output .= '<p class="time">' . $time_ranges[$i] . '</p>';
      $output .= '<p class="rain">' . ($data['rainProbability'][$i]['precipitation_probability'] ?? '') . '%</p>';
      $output .= '</li>';
    }
    $output .= '</ul>';
  }
  $output .= '</div>';

  return $output;
}

function generateWeeklyWeatherOutput($data, $textColor, $showHoliday)
{
  $output = '<li class="block--day">';
  $output .= '<h4' . $textColor . '>' . ($data['day']['date']['month'] ?? '') . ($data['day']['date']['day'] ?? '') . '<br/>' . ($data['day']['date']['dayOfWeek']  ?? '') . '</h4>';
  if ($showHoliday) {
    $output .= '<p>' . esc_html($data['day']['holidayName'] ?? '') . '</p>';
  }
  $output .= '<p class="weather__name">' . ($data['name'] ?? '')  . '</p>';
  $output .= "<img src=\"{$data['image']}\" alt=\"weather icon\">";
  $output .= '<ul class="temp">';
  $output .= '<li>';
  $output .= '<p>' . ($data['highestTemperature'] ?? '') . '<span class="celsius">℃</span></p>';
  $output .= '<p>' . ($data['maximumTemperatureComparison'] ?? '') . '</p>';
  $output .= '</li>';
  $output .= '<li>';
  $output .= '<p>' . ($data['lowestTemperature'] ?? '') . '<span class="celsius">℃</span></p>';
  $output .= '<p>' . ($data['lowestTemperatureComparison'] ?? '') . '</p>';
  $output .= '</li>';
  $output .= '</ul>';
  $output .= '</li>';

  return $output;
}
