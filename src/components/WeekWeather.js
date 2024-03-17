import Temp from './Temp';
import useBorderStyles from '../hooks/useBorderStyles';
import { getBackgroundStyles } from '../hooks/getBackgroundStyles';
import getTextColor from '../hooks/getTextColor';
import '../editor.scss';
import '../style.scss';

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
            {dayWeather.day.isHoliday && (
              <p>{displayDate}</p>
            )}
            {/* showHolidayがtrueの場合のみ祝日の名前を表示 */}
            {showHoliday && weather.day.isHoliday && (
              <p>{weather.day.holidayName}</p>
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

