const path = require('path');

module.exports = {
  // カスタムビルドのエントリーポイント
  entry: './src/frontend.js',
  // 出力設定
  output: {
    path: path.resolve(__dirname, 'frontScript'), // 出力ディレクトリ
    filename: 'frontend.js', // 出力ファイル名
  },
  // 必要に応じて、loaderやプラグインの設定をここに追加
};