import { isApiError } from '../objects/weatherObject';

const ErrorMessage = () => {
  return (
    <>
      <div>
        <p>APIアクセスが制限されています。</p>
        <p>ダミーデータを表示するなどの代替処理を行ってください。</p>
        <p>ステータスコード: {isApiError.statusCode}</p>
      </div>
    </>
  );
};

export default ErrorMessage;

