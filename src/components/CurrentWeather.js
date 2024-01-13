import Temp from "./Temp";
import TimeZone from "./TimeZone";
import useBorderStyles from "../functions/useBorderStyles";
import '../style.scss';

const CurrentWeather = ({
  borders,
  borderRadius,
  fontFamily,
  color,
  weather,
  title,
  showPrecipitation,
  showHoliday,
  styleVariant,
  backgroundStyleType,
  selectedMedia,
  backgroundGradient,
  backgroundColor
}) => {

  if (!weather || !weather.day) return null; // weather と weather.day の存在を確認

  const isHoliday = weather.day.isHoliday;

  let textColor;
  if (isHoliday || weather.day.isSunday) {
    textColor = "red";
  } else if (weather.day.isSaturday) {
    textColor = "blue";
  }

  const borderStyles = useBorderStyles(borders);
  let backgroundStyles = {};
  if (backgroundStyleType === 'image' && selectedMedia) {
    backgroundStyles.backgroundImage = `url('${selectedMedia}')`;
    backgroundStyles.backgroundSize = 'cover';
    backgroundStyles.backgroundRepeat = 'no-repeat';
    backgroundStyles.backgroundPosition = 'center';
  } else if (backgroundStyleType === 'color' && backgroundColor) {
    backgroundStyles.backgroundColor = backgroundColor;
  } else if (backgroundStyleType === 'gradient' && backgroundGradient) {
    backgroundStyles.background = backgroundGradient;
  }


  return (
    <article className={`block--current ${styleVariant}`} style={{
      ...borderStyles,
      borderRadius: borderRadius,
      fontFamily: fontFamily,
      ...backgroundStyles,
      color
    }}>
      <h3>{title}</h3>
      <h4 style={{ color: textColor }}>{weather.day.date.fullDate}</h4>

      {/* showHolidayがtrueの場合のみ祝日の名前を表示 */}
      {showHoliday && weather.day.isHoliday && (
        <p>{weather.day.holidayName}</p>
      )}

      <p className="weather__name">{weather.name}</p>
      <img src={weather.image} alt="weather icon" />
      <Temp weather={weather} />

      {/* showPrecipitationがtrueの場合のみTimeZoneコンポーネントを表示 */}
      {showPrecipitation && <TimeZone weather={weather} />}
    </article>
  )
}

export { CurrentWeather };
