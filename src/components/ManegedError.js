import { responseErrorMessage } from "../objects/errorMessages";
import { isApiError } from "../objects/weatherObject";

const ManagedError = () => {
  let errorTitle;
  let errorMessage;

  if (isApiError.isError) {
    errorTitle = "APIの取得に失敗しました。";
  }
  if (isApiError.statusCode === null || isApiError.statusCode === undefined) {
    isApiError.statusCode = "不明なエラー";
  } else {
    errorMessage = responseErrorMessage[isApiError.statusCode] || "不明なエラーが発生しました。";
  }

  return (
    <>
      <div>
        <p>{errorTitle}</p>
        <p className="error-message">{errorMessage}</p>
        <p>ステータスコード: {isApiError.statusCode}</p>
        <p>ブラウザの開発者ツールを開き、</p>
        <p>エラー内容を確認してください。</p>
      </div>
    </>
  );
};

export default ManagedError;
