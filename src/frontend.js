document.getElementById('loadCredits').addEventListener('click', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', JWeatherCustomizerData.creditsUrl, true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('creditsContainer').innerHTML = this.responseText;
      
      // コンテンツが挿入された後に`return`ボタンが存在するかチェックし、イベントリスナーを追加
      var returnButton = document.getElementById('credits-return');
      if (returnButton) {
        returnButton.addEventListener('click', function () {
          document.getElementById('creditsContainer').innerHTML = ''; // コンテンツをクリア
        });
      }
    }
  };
  xhr.send();
});
