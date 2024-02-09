// ResponseErrorコンポーネント

export const ResponseError = ({ errorMessage }) => {
  if (!errorMessage) {
    return null; // エラーメッセージがない場合は何も表示しない
  }

  return (
    <div>
      <h4>{errorMessage.title}</h4>
      <p>{errorMessage.notice}</p>
      <img src={errorMessage.icon} alt="Error icon" />
    </div>
  );
};
