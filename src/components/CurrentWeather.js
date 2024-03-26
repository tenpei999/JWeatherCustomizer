import Temp from "./Temp";
import TimeZone from "./TimeZone";
import useBorderStyles from "../hooks/useBorderStyles";
import { getBackgroundStyles } from '../hooks/getBackgroundStyles';
import getTextColor from '../hooks/getTextColor';
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

  const textColor = getTextColor(weather);
  if (!weather || !weather.day) return null;

  const borderStyles = useBorderStyles(borders);
  const backgroundStyles = getBackgroundStyles({ backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient });

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

      {showHoliday && weather.day.isHoliday && (
        <p>{weather.day.holidayName}</p>
      )}

      <p className="weather__name">{weather.name}</p>
      <img src={weather.image} alt="weather icon" />
      <Temp weather={weather} />
      
      {showPrecipitation && <TimeZone weather={weather} />}
    </article>
  )
};

export { CurrentWeather };
