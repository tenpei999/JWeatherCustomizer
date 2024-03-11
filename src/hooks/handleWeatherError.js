import { responseErrorMessage } from "../objects/responseErrorMessages";

export const handleWeatherError = (isApiError) => {
  if (!isApiError.isError) {
    // エラーがない場合は何もしない
    return null;
  }

  // エラーがある場合、エラーメッセージを取得
  const pluginImagePaths = JWeatherCustomizerData.pluginImagePath; // 適切なパス取得方法を用いる
  const messages = responseErrorMessage(pluginImagePaths); // ステータスコードに応じたエラーメッセージを格納するオブジェクト
  const messageForStatusCode = messages[isApiError.statusCode]; // ステータスコードに一致するメッセージを選択

  // ステータスコードに一致するエラーメッセージがない場合のデフォルト処理
  if (!messageForStatusCode) {
    return {
      title: 'Unknown Error',
      notice: 'An unknown error occurred.',
      icon: `${pluginImagePaths}default-error-icon.svg`, // 例: デフォルトのエラーアイコンパス
    };
  }

  return messageForStatusCode;
};
