<?php
// PHPによるCreditsコンポーネントの再現

// Creditsリストの項目を配列として定義
$creditsList = [
  [
    'text' => 'Weather data by Open-Meteo.com',
    'url' => 'https://open-meteo.com/'
  ],
  [
    'text' => 'Holiday information obtained from Holidays JP by matsuoshi',
    'url' => 'https://holidays-jp.github.io/',
    'additional' => [
      [
        'text' => 'Licensed by MIT',
        'url' => 'https://opensource.org/license/mit'
      ]
    ]
  ],
  [
    'text' => 'The icons are from the Japan Meteorological Agency',
    'url' => 'https://www.jma.go.jp/jma/kishou/info/coment.html',
    'children' => [
      'https://www.jma.go.jp/bosai/forecast/img/100.svg',
      'https://www.jma.go.jp/bosai/forecast/img/101.svg',
      'https://www.jma.go.jp/bosai/forecast/img/200.svg',
      'https://www.jma.go.jp/bosai/forecast/img/202.svg',
      'https://www.jma.go.jp/bosai/forecast/img/302.svg',
      'https://www.jma.go.jp/bosai/forecast/img/400.svg',
    ]
  ]
];

$output = '';
$output .= '<article class="credits-full"><div><h3>Credits</h3><ul>';

// Creditsリストの項目をループして出力
foreach ($creditsList as $item) {
  $output .= '<li class="credits-list">';
  if (!empty($item['url'])) {
    $output .= '<a href="' . htmlspecialchars($item['url']) . '">' . htmlspecialchars($item['text']) . '</a>';
  } else {
    $output .= htmlspecialchars($item['text']);
  }

  // 追加のリンクや子項目の処理
  if (!empty($item['additional'])) {
    foreach ($item['additional'] as $additionalItem) {
      $output .= '<p><a href="' . htmlspecialchars($additionalItem['url']) . '">' . htmlspecialchars($additionalItem['text']) . '</a></p>';
    }
  }

  if (!empty($item['children'])) {
    $output .= '<ul class="credits-list__child">';
    foreach ($item['children'] as $childUrl) {
      $output .= '<li><a href="' . htmlspecialchars($childUrl) . '">' . htmlspecialchars($childUrl) . '</a></li>';
    }
    $output .= '</ul>';
  }

  $output .= '</li>';
}

$output .= '</ul>';

$output .= '<button id="credits-return">return</button>';
$output .= '</div></article>';

echo $output;
