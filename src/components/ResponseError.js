
export const ResponseError = ({ errorMessage }) => {
  if (!errorMessage) {
    return null; // エラーメッセージがない場合は何も表示しない
  }

  const grid = {
    display: 'grid',
    gridTemplateColumn: '1fr',
    gridTemplateRows: '20% 40% 40%',
    border: 'solid #fe8509',
    borderRadius: '50px',
    height: '60vh',
  }

  const title = {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 'auto',
  }

  const image = {
    height: '100%',
  }

  const imageParent = {
    margin: '0 auto',
    paddingBottom: '2.2rem',
    height: '35%',
    position: 'relative'
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

  const letterSpacing = {
    letterSpacing: '-1px',
  }
  const letterSpacingWide = {
    letterSpacing: '1px',
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
        <div className="jwc-responseError-imageContainer" style={imageParent}>
          <img src={errorMessage.icon} style={image} alt="Error icon" />
        </div>
        <p>
          {errorMessage.notice}
        </p>
        <p style={letterSpacingWide}>
          <span style={letterSpacing}>JWeatherCustomizer</span>エラー:{errorMessage.statuscode}
        </p>
      </div>
      <div style={noticeBox}>
        <p style={guidance}>{errorMessage.guidance}</p>
        <p style={supplement}>{errorMessage.supplement}</p>
      </div>
    </article>
  );
};
