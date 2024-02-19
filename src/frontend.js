document.addEventListener('DOMContentLoaded', function() {
  // 特定のブロックIDやクラスに基づいて操作を行う
  const blocks = document.querySelectorAll('.wp-block-create-block-j-weather-customizer');
  const current = document.querySelectorAll('.block--current');

  current.forEach(function(block) {
      // ここにブロックごとの処理を書く
      const weatherName = block.getAttribute('data-attribute-name');
      console.log(weatherName); // コンソールに天気の名前を出力

      console.log(block)
  });
});