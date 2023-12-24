import { responseErrorMessage } from "../objects/errorMessages";
import { isApiError } from "../objects/weatherObject";

const ManagedError = () => {
  let errorMessage;

  if (isApiError.statusCode === null || isApiError.statusCode === undefined) {
    isApiError.statusCode = "不明なエラー";
  } else {
    errorMessage = responseErrorMessage[isApiError.statusCode] || "不明なエラーが発生しました。";
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

export default ManagedError;
