import Temp from './Temp';
import useBorderStyles from '../hooks/useBorderStyles';
import { getBackgroundStyles } from '../hooks/getBackgroundStyles';
import getTextColor from '../hooks/getTextColor';
import '../editor.scss';
import '../style.scss';

/**
 * Renders weather information for the week. Utilizes custom hooks for applying border
 * and background styles based on component attributes. Each day's weather information
 * includes temperature, condition name, and an icon.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} props.borders - Border style settings.
 * @param {string} props.borderRadius - Border radius setting.
 * @param {string} props.fontFamily - Font family setting.
 * @param {Array} props.weather - Array containing weather data for each day.
 * @param {string} props.color - Text color setting.
 * @param {string} props.styleVariant - Additional CSS class for style variation.
 * @param {string} props.backgroundStyleType - Background style type (image, color, gradient).
 * @param {string} props.selectedMedia - URL for the background image, if applicable.
 * @param {string} props.backgroundGradient - CSS for the background gradient, if applicable.
 * @param {string} props.backgroundColor - Background color setting.
 * @param {boolean} props.showHoliday - Flag to display holidays.
 * 
 * @returns JSX.Element | null - A list of daily weather conditions for the week or null if no weather data is provided.
 */
const WeekWeather = ({
  borders,
  borderRadius,
  fontFamily,
  weather,
  color,
  styleVariant,
  backgroundStyleType,
  selectedMedia,
  backgroundGradient,
  backgroundColor,
  showHoliday,
}) => {

  if (!weather || !Array.isArray(weather)) return null;

  // Using custom hooks to get styles for borders and background based on the props.
  const borderStyles = useBorderStyles(borders);
  const backgroundStyles = getBackgroundStyles({ backgroundStyleType, selectedMedia, backgroundColor, backgroundGradient });

  return (
    <ul className={`block--weekly weather-layout ${styleVariant}`}
      style={{
        ...borderStyles,
        borderRadius: borderRadius,
        fontFamily: fontFamily,
        ...backgroundStyles,
        color
      }}>
      {weather.slice(0, 6).map((dayWeather, index) => {
        if (!dayWeather || !dayWeather.day) return null;
        const textColor = getTextColor(dayWeather);

        return (
          <li className="block--day" key={index} >
            <h4 className="c-title__weather" style={{ color: textColor }}>
              {dayWeather.day.date.month}{dayWeather.day.date.day}<br />{dayWeather.day.date.dayOfWeek}
            </h4>
            {showHoliday && dayWeather.day.isHoliday && (
              <p>{dayWeather.day.holidayName}</p>
            )}
            <p className="weather__name">{dayWeather.name}</p>
            <span className="weather__img">
              <img src={dayWeather.image} alt="Weather Icon" />
            </span>
            <Temp weather={dayWeather} />
          </li>
        );
      })}
    </ul>
  );
};

export default WeekWeather;
