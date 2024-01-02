<?php

// function setTextColor($day)
// {
//   if ($day['isHoliday'] ?? false) {
//     return ' style="color: red"';
//   } elseif ($day['isSunday'] ?? false) {
//     return ' style="color: red"';
//   } elseif ($day['isSaturday'] ?? false) {
//     return ' style="color: blue"';
//   }
//   return '';
// }

function generateBorderStyle($borders, $borderRadiusValue)
{
  $styles = [];
  if ($borders) {
    foreach ($borders as $side => $border) {
      $styles[] = "border-{$side}: {$border['width']} {$border['style']} {$border['color']}";
    }
  }
  if ($borderRadiusValue) {
    $styles[] = "border-radius: {$borderRadiusValue}";
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
        $styles[] = 'background: ' . $attr['backgroundColor'];
      }
      break;
    case 'gradient':
      if ($attr['backgroundGradient']) {
        $styles[] = 'background: ' . $attr['backgroundGradient'];
      }
      break;
  }
  return implode('; ', $styles);
}

function jWeatherCustomizer_render_block($attr, $content)
{
  $weather_data = json_decode(get_option('jweather_customizer_data'), true);

  if (!$weather_data) {
    return '天気データが取得できませんでした。';
  }


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

  // error_log('Data that failed to save: ' . print_r($attr, true));

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
  $colorStyle = 'color: ' . $attr['textColor'] . ';';
  $fontStyle = 'font-family: ' . $attr['fontFamily'] . ';';
  $backgroundStyles = generateBackgroundStyles($attr);
  $borderStyles = generateBorderStyle($attr['borders'], $attr['borderRadiusValue']);

  $commonStyle = $borderStyles . ' ; ' . $colorStyle . ' ; ' . $backgroundStyles . ' ; ' . $fontStyle . ' ; ';

  // Output
  $output = '<div class="wp-block-create-block-j-weather-customizer" style="">';
  $output .= '<div class="layout"><div class="today-and-tomorrow weather-layout">';

  $time_ranges = ['0-6時', '6-12時', '12-18時', '18-24時'];



  if ($attr['showTodayWeather'] && isset($attr['todayWeather'])) {
    $data = $attr['todayWeather']; // 今日の天気データを $data に設定
    $textColor = setTextColor($data['day'] ?? []);
    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], __('今日の天気', 'j-weather-customizer'), $commonStyle, $attr['balanceOption']);
  }

  if ($attr['showTomorrowWeather'] && isset($attr['tomorrowWeather'])) {
    $data = $attr['tomorrowWeather']; // 明日の天気データを $data に設定
    $textColor = setTextColor($data['day'] ?? []);
    $output .= generateWeatherOutput($data, $textColor, $time_ranges, $attr['showHoliday'], $attr['showPrecipitation'], __('明日の天気', 'j-weather-customizer'), $commonStyle, $attr['balanceOption']);
  }

  $output .= '</div></div>';

  if ($attr['showWeeklyWeather'] && isset($attr['weeklyWeather']) && is_array($attr['weeklyWeather'])) {
    $output .= '<ul class="block--weekly weather-layout ' . esc_attr($attr['balanceOption']) . '" style="' . $commonStyle . '">';
    foreach ($attr['weeklyWeather'] as $i => $dayWeather) {
      $data = $attr['weeklyWeather'][$i]; // 週間天気データを $data に設定
      $textColor = setTextColor($data['day'] ?? []);
      $output .= generateWeeklyWeatherOutput($data, $textColor, $attr['showHoliday']); // 週間天気用の出力関数を呼び出し
    }
  }

  return $output;
}

function generateWeatherOutput($data, $textColor, $time_ranges, $showHoliday, $showPrecipitation, $title, $commonStyle, $selectedBalance)
{
  // error_log('generateWeatherOutput - data: ' . print_r($data, true));

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

  // error_log('generateWeeklyWeatherOutput - data: ' . print_r($data, true));
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
