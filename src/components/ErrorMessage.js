import { isApiError } from '../objects/weatherObject';

const ErrorMessage = () => {
  let errorMessage;

  switch (isApiError.statusCode) {
    case 400:
      errorMessage = "リクエストが不正です。入力を確認してください。";
      break;
    case 401:
      errorMessage = "認証に失敗しました。APIキーを確認してください。";
      break;
    case 403:
      errorMessage = "アクセスが拒否されました。権限を確認してください。";
      break;
    case 404:
      errorMessage = "リクエストしたリソースが見つかりませんでした。";
      break;
    case 500:
      errorMessage = "サーバー側で問題が発生しました。後ほど再試行してください。";
      break;
    case 503:
      errorMessage = "サービスが利用不可です。後ほど再試行してください。";
      break;
    default:
      errorMessage = "不明なエラーが発生しました。";
  }

  return (
    <>
      <div>
        <p>APIの取得に失敗しました。</p>
        <p className="error-message">{errorMessage}</p>
        <p>ステータスコード: {isApiError.statusCode}</p>
      </div>
    </>
  );
};

export default ErrorMessage;


