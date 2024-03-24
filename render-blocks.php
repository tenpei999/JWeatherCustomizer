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
  if (!isset($attr['backgroundStyleType'])) return '';

  switch ($attr['backgroundStyleType']) {
    case 'image':
      if ($attr['backgroundImage']) {
        if (!empty($attr['backgroundImage'])) {
          $styles[] = 'background-image: url(' . esc_url($attr['backgroundImage']) . ')';
        };
        $styles[] = 'background-size: cover';
        $styles[] = 'background-repeat: no-repeat';
        $styles[] = 'background-position: center';
      }
      break;
    case 'color':
      if (!empty($attr['backgroundColor'])) {
        $styles[] = 'background: ' . esc_attr($attr['backgroundColor']);
      }
      break;
    case 'gradient':
      if (!empty($attr['backgroundGradient'])) {
        $styles[] = 'background: ' . esc_attr($attr['backgroundGradient']);
      }
      break;
  }
  return implode('; ', $styles);
}
function jWeatherCustomizer_render_block($attr, $content)
{

  $attr = array_merge([
    'uniqueID' => sanitize_key($attr['uniqueID'] ?? uniqid('block_', true)),
    'showTodayWeather' => filter_var($attr['showTodayWeather'] ?? true, FILTER_VALIDATE_BOOLEAN),
    'showTomorrowWeather' => filter_var($attr['showTomorrowWeather'] ?? true, FILTER_VALIDATE_BOOLEAN),
    'showWeeklyWeather' => filter_var($attr['showWeeklyWeather'] ?? true, FILTER_VALIDATE_BOOLEAN),
    'showHoliday' => filter_var($attr['showHoliday'] ?? false, FILTER_VALIDATE_BOOLEAN),
    'showPrecipitation' => filter_var($attr['showPrecipitation'] ?? false, FILTER_VALIDATE_BOOLEAN),
    'borders' => $attr['borders'] ?? null,
    'borderRadiusValue' => sanitize_text_field($attr['borderRadiusValue'] ?? ''),
    'fontFamily' => sanitize_text_field($attr['fontFamily'] ?? 'Noto Sans JP, sans-serif'),
    'textColor' => sanitize_hex_color($attr['textColor'] ?? 'black'),
    'backgroundStyleType' => sanitize_text_field($attr['backgroundStyleType'] ?? 'color'),
    'backgroundImage' => esc_url_raw($attr['backgroundImage'] ?? ''),
    'backgroundGradient' => sanitize_text_field($attr['backgroundGradient'] ?? ''),
    'backgroundColor' => sanitize_hex_color($attr['backgroundColor'] ?? '#fff'),
    'balanceOption' => sanitize_text_field($attr['balanceOption'] ?? 'EmphasizeTheWeather'),
    'selectedCity' => [
      'type' => 'object',
      'default' => [
        'name' => '東京',
        'url' => DEFAULT_WEATHER_API_URL
      ]
    ],
  ], $attr);


  $uniqueID = $attr['uniqueID'];
  $apiUrl = $attr['selectedCity']['url'];

  if (filter_var($apiUrl, FILTER_VALIDATE_URL) === false) {
    return 'エラー: 指定されたURLが無効です。';
  }

  $uniqueID = (isset($attr['uniqueID']) && !empty($attr['uniqueID'])) ? $attr['uniqueID'] : uniqid('block_', true);
  $weatherData = fetchWeatherDataWithCache($apiUrl, $uniqueID);
  $todayWeather = $weatherData['today'] ?? [];
  $tomorrowWeather = $weatherData['tomorrow'] ?? [];
  $weeklyWeather = $weatherData['weekly'] ?? [];

  $setTextColor = function ($day) {
    if ($day['isHoliday'] ?? false) {
      return ' style="color: red"';
    } elseif ($day['isSunday'] ?? false) {
      return ' style="color: red"';
    } elseif ($day['isSaturday'] ?? false) {
      return ' style="color: blue"';
    }
    return '';
  };

  // Styles
  $colorStyle = 'color: ' . esc_attr($attr['textColor']) . ';';
  $fontStyle = 'font-family: ' . esc_attr($attr['fontFamily']) . ';';
  $backgroundStyles = generateBackgroundStyles($attr);
  $borderStyles = generateBorderStyle($attr['borders'], $attr['borderRadiusValue']);
  $commonStyle = esc_attr($borderStyles) . ' ; ' . $colorStyle . ' ; ' . esc_attr($backgroundStyles) . ' ; ' . $fontStyle . ' ; ';


  // Output
  $output = '<div class="wp-block-create-block-j-weather-customizer" id = "' . esc_attr($uniqueID) . '"  style="">';
  $output .= '<div class="layout"><div class="today-and-tomorrow weather-layout">';

  $time_ranges = ['0-6時', '6-12時', '12-18時', '18-24時'];


  if ($attr['showTodayWeather'] && isset($attr['todayWeather'])) {
    $data = $todayWeather;
    $textColor = $setTextColor($data['day'] ?? []);

    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], esc_html__('今日の天気', 'j-weather-customizer'), $commonStyle, esc_attr($attr['balanceOption']));
  }

  if ($attr['showTomorrowWeather'] && isset($attr['tomorrowWeather'])) {
    $data = $tomorrowWeather;
    $textColor = $setTextColor($data['day'] ?? []);
    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], esc_html__('明日の天気', 'j-weather-customizer'), $commonStyle, esc_attr($attr['balanceOption']));
  }

  $output .= '</div></div>';

  if ($attr['showWeeklyWeather'] && isset($weeklyWeather) && is_array($weeklyWeather)) {
    $output .= '<ul class="block--weekly weather-layout ' . esc_attr($attr['balanceOption']) . '" style="' . $commonStyle . '">';

    $maxDays = 4;
    foreach ($weeklyWeather as $i => $dayWeather) {
      if ($i <= $maxDays) {
        $data = $weeklyWeather[$i];
        $textColor = $setTextColor($data['day'] ?? []);
        $output .= generateWeeklyWeatherOutput($data, $textColor, $attr['showHoliday']);
      } else {
        break;
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
