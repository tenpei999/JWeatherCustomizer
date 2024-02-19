document.addEventListener('DOMContentLoaded', function() {
  // 特定のブロックIDやクラスに基づいて操作を行う
  const blocks = document.querySelectorAll('.wp-block-create-block-j-weather-customizer');

  blocks.forEach(function(block) {
      // ここにブロックごとの処理を書く
      console.log(block); // 例としてコンソールに出力
  });
});