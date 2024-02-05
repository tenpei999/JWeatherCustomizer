// errorMessages.js

export const responseErrorMessage2 = {
  400: "リクエストが不正です。入力を確認してください。",
  401: "認証に失敗しました。APIキーを確認してください。",
  403: "アクセスが拒否されました。権限を確認してください。",
  404: "リクエストしたリソースが見つかりませんでした。",
  500: "サーバー側で問題が発生しました。後ほど再試行してください。",
  503: "サービスが利用不可です。後ほど再試行してください。",
};
// errorMessages.js

export const responseErrorMessage = {
  400: {
    title: "不正なリクエストエラー",
    notice: "JWeatherCustomizerは、無効なリクエストを検知したため機能を停止しました。",
    guidance: "JWeatherCustomizerを速やかに停止し、管理者に連絡してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
  },
  401: {
    title: "認証エラー",
    notice: "JWeatherCustomizerはAPI Keyが一致しません。",
    guidance: "プラグインを速やかに停止し、管理者に連絡してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
  },
  403: {
    title: "アクセス禁止エラー",
    notice: "JWeatherCustomizerに許可されていない操作を行いました。",
    guidance: "WordPressにログインし直してください",
    supplement: "設定は更新前の情報を維持します。",
  },
  404: {
    title: "URL不存在エラー",
    notice: "JWeatherCustomizerは都市のurlが見つかりませんでした。",
    guidance: "JWeatherCustomizerを速やかに停止し、管理者に連絡してください。",
    supplement: "設定は更新前の情報を維持します。",
  },
  500: {
    title: "サーバー内部エラー",
    notice: "サーバーに接続できないためJWeatherCustomizerはデータを更新できません。",
    guidance: "インターネット接続を確認してから再試行してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
  },
  503: {
    title: "サービス利用不可エラー",
    notice: "JWeatherCustomizerは、API提供元サーバーの影響によりサービスが一時的に利用不可です",
    guidance: "時間をおいてから再度操作を行い、解決しなければ管理者に連絡してください。",
    supplement: "設定は更新前の情報を維持します。",
  },
};
