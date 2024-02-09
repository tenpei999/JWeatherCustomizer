
export const responseErrorMessage = (pluginImagePaths) => ({
  400: {
    title: "不正なリクエストエラー",
    notice: "無効なリクエストを検知したため機能を停止しました。",
    guidance: "JWeatherCustomizerを速やかに停止し、管理者に連絡してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
    icon: `${pluginImagePaths}attention.svg`,
  },
  401: {
    title: "認証エラー",
    notice: "はAPI Keyが一致しません。",
    guidance: "プラグインを速やかに停止し、管理者に連絡してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
    icon: `${pluginImagePaths}ID.svg`,
  },
  403: {
    title: "アクセス禁止エラー",
    notice: "許可されていない操作を行いました。",
    guidance: "WordPressにログインし直してください",
    supplement: "設定は更新前の情報を維持します。",
    icon: `${pluginImagePaths}stop.svg`,
  },
  404: {
    title: "URL不存在エラー",
    notice: "都市のurlが見つかりませんでした。",
    guidance: "JWeatherCustomizerを速やかに停止し、管理者に連絡してください。",
    supplement: "設定は更新前の情報を維持します。",
    icon: `${pluginImagePaths}question.svg`,
  },
  500: {
    title: "サーバー内部エラー",
    notice: "サーバーに接続できないためJWeatherCustomizerはデータを更新できません。",
    guidance: "インターネット接続を確認してから再試行してください。",
    supplement: "サイトに天気情報が表示されていない可能性があります。",
    icon: `${pluginImagePaths}server.svg`,
  },
  503: {
    title: "サービス利用不可エラー",
    notice: "API提供元サーバーの影響によりサービスが一時的に利用不可です",
    guidance: "時間をおいてから再度操作を行い、解決しなければ管理者に連絡してください。",
    supplement: "設定は更新前の情報を維持します。",
    icon: `${pluginImagePaths}attention.svg`,
  },
  default: {
    title: "未知のエラー",
    notice: "予期せぬエラーが発生しました。",
    guidance: "サポートにお問い合わせください。",
    supplement: "詳細な情報は利用できません。",
    icon: `${pluginImagePaths}attention.svg`,
  },
});
