# JWeatherCustomizer WordPressプラグイン

## 説明
JWeatherCustomizerは、ブロックエディタを採用しているWordPressバージョンで利用可能な、天気予報を表示するWordPressプラグインです。ユーザーはサイトに表示したい地域の天気予報を自由に選択し、見た目の設定もカスタマイズ可能です。ただし、このプラグインは日本国内の都市の天気のみをサポートしています。

**注意:** 2023年11月現在、JWeatherCustomizerは公式のWordPressプラグインディレクトリには登録されていません。

## 機能
- 日本国内の都市の天気予報を表示する機能
- ユーザーが表示する地域を自由に選択可能
- 見た目の設定変更が可能（枠線、テキストの色、フォントファミリーなど）

## インストール
JWeatherCustomizerプラグインは、WordPressの`plugins`ディレクトリでの`git clone`またはZIPファイルのダウンロードによってインストール可能です。

### Git Cloneを使用する場合
```bash
git clone https://github.com/your-username/JWeatherCustomizer.git
```

### ZIPファイルをダウンロードしてインストールする場合
1 以下のURLからZIPファイルをダウンロードします。
https://github.com/your-username/JWeatherCustomizer/archive/main.zip
2 ZIPファイルを解凍し、JWeatherCustomizerフォルダをWordPressのpluginsディレクトリにアップロードします。

## 使い方
1 WordPressの管理画面からプラグインを有効化します。
2 投稿または固定ページの編集画面に移動し、「ブロックを追加」ボタンからJWeatherCustomizerプラグインを選択します。
3 ブロックがページに追加された後、以下の設定でカスタマイズすることができます。

###ブロックの追加
・投稿または固定ページの編集画面で、「ブロックを追加」をクリックします。
・「テキスト」カテゴリー内にあるJWeatherCustomizerを選択してブロックを追加します。

###初期設定
・ブロックを追加すると、JWeatherCustomizerの設定モードが表示されます。
・東京の今日・明日の天気と週間予報がデフォルトで表示されます。
・デフォルトの見た目に満足していれば、ブロック外をクリックして設定を完了します。

###カスタマイズ
**・都市を選択**: プルダウンメニューから都市を選択できます。
**・表示設定**: 以下の項目の表示・非表示を選択できます。
  今日の天気
  明日の天気
  週間天気
  祝日
  降水確率

####・見た目の設定####: 
**・BORDERS**: border-width, border-radius, border-color, border-styleをカスタマイズできます。
**・テキストの色**: 黒または白を選択できます。
**・フォントファミリー**: Noto Sans JP, Noto Serif JP, M PLUS 1p, Kosugi Maru, Sawarabi Gothicから選択できます。
**・フォントバランス**: EmphasizeTheWeather, EmphasizeTheTemperature, Comfortableの中からバランスを選択できます。
**・背景の種類**: グラデーション, カラーから選択できます。

## API情報
JWeatherCustomizerは以下のAPIに依存しています。

Open-Meteo: https://open-meteo.com/
holidays-jp: https://holidays-jp.github.io/

## サポート
問題がある場合やサポートが必要な場合は、tenpei999@gmail.com までご連絡ください。

## ライセンス
このプラグインはGPLv2ライセンスのもとで公開されています。