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
        <h3>{errorTitle}</h3>
        <p>ステータス: {isApiError.statusCode}</p>
        <p className="error-message">{errorMessage}</p>
        <p>天気情報の更新に失敗しました。
          設定情報は前回の情報を維持します。</p>
      </div>
    </>
  );
};

export default ManagedError;
