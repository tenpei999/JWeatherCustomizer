import { isApiError } from "../objects/weatherObject";

export const ResponseError = ({ errorMessage }) => {
  if (!errorMessage) {
    return null; // エラーメッセージがない場合は何も表示しない
  }

  const grid = {
    display: 'grid',
    gridTemplateColumn: '1fr',
    gridTemplateRows: '20% 45% 35%',
    border: 'solid #ff6b81',
    height: '70vh',
  }

  const title = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 'auto',
  }

  const image = {
    display: 'block',
    height: '60%',
    margin: '0 auto',
    paddingBottom: '1.2rem'
  }

  const imageBox = {
    width: '50%',
    margin: '0 auto',
    fontWeight: 'bold',
    color: 'red',
    fontSize: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    lineHeight: '1.2'
  }

  const guidance = {
    fontSize: '1.7rem',
    display: 'inline',
    borderBottom: 'solid',
  }

  const noticeBox = {
    width: '70%',
    display: 'inlinBlock',
    margin: 'auto',
    lineHeight: '1.2',
  }

  const supplement = {
    paddingTop: '1rem',
  }

  return (
    <article style={grid}>
      <h4 style={title}>{errorMessage.title}</h4>
      <div style={imageBox}>
        <img src={errorMessage.icon} style={image} alt="Error icon" />
        <p>
          {errorMessage.notice}
        </p>
        <p>
          JWeatherCustomizerエラー:{isApiError.statusCode}
        </p>
      </div>
      <div style={noticeBox}>
        <p style={guidance}>{errorMessage.guidance}</p>
        <p style={supplement}>{errorMessage.supplement}</p>
      </div>
    </article>
  );
};
