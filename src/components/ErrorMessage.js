import { isApiError } from '../objects/weatherObject';

const ErrorMessage = () => {
  return (
    <>
      <div>
        <p>APIの取得に失敗しました。</p>
        <p>ステータスコード: {isApiError.statusCode}</p>
      </div>
    </>
  );
};

export default ErrorMessage;

