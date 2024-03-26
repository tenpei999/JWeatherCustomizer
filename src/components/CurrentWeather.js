import Temp from "./Temp";
import TimeZone from "./TimeZone";
import useBorderStyles from "../hooks/useBorderStyles";
import { getBackgroundStyles } from '../hooks/getBackgroundStyles';
import getTextColor from '../hooks/getTextColor';
import '../style.scss';

/**
 * Renders the current weather conditions with customizable styles.
 * Utilizes custom hooks and components to display weather data dynamically based on props.
 * 
 * @param {Object} props - Properties passed to the component including weather data and style preferences.
 * @returns JSX.Element | null - The CurrentWeather component or null if weather data is missing.
 */
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

  // Return null early if weather data is not provided.
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

      {/* Conditionally render holiday name if available and applicable. */}
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
