export const Credits = ({ setShowCredits }) => {

  const handleClose = () => {
    setShowCredits(false); // '戻る' ボタンクリックで showCredits 状態を更新
  };

  return (
    <article className="credits-full">
      <div>
        <h3>Credits</h3>
        <ul>
          <li className="credits-list">
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
          </li>
          <li className="credits-list">
            <p>
              <a href="https://holidays-jp.github.io/">Holiday information obtained from Holidays JP by matsuoshi</a>
            </p>
            <p>
              <a href="https://opensource.org/license/mit">Licensed by MIT</a>
            </p>
          </li>
          <li className="credits-list">
            <p>
              <a href="https://www.jma.go.jp/jma/kishou/info/coment.html">The icons are from the Japan Meteorological Agency</a>
            </p>
            <ul className="credits-list__child">
              <li><a>https://www.jma.go.jp/bosai/forecast/img/100.svg</a></li>
              <li><a>https://www.jma.go.jp/bosai/forecast/img/101.svg</a></li>
              <li><a>https://www.jma.go.jp/bosai/forecast/img/200.svg</a></li>
              <li><a>https://www.jma.go.jp/bosai/forecast/img/202.svg</a></li>
              <li><a>https://www.jma.go.jp/bosai/forecast/img/302.svg</a></li>
              <li><a>https://www.jma.go.jp/bosai/forecast/img/400.svg</a></li>
            </ul>
          </li>
        </ul>
        <button onClick={handleClose}>return</button>
      </div>
    </article>
  );
}