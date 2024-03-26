/**
 * Displays the chance of rain for different times throughout the day.
 * This component renders a list showing precipitation probabilities at specific intervals.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.weather - The weather data containing rain probability information.
 * @returns JSX.Element | null - A list of precipitation probabilities or null if weather data is not provided.
 */

const TimeZone = ({ weather }) => {

  if (!weather) return null;

  return (
    <ul className="time-zone">
      <li className="c-weather__chanceOfRain-index">
        <p className="time">時間</p>
        <p className="rain">降水</p>
      </li>
      <li className="c-weather__chanceOfRain-timezone1">
        <p className="time">0時</p>
        <p id="todayschanceOfRain1" className="rain">{weather.rainProbability[0].precipitation_probability
        }%</p>
      </li>
      <li className="c-weather__chanceOfRain-timezone2">
        <p className="time">6時</p>
        <p id="todayschanceOfRain2" className="rain">{weather.rainProbability[1].precipitation_probability
        }%</p>
      </li>
      <li className="c-weather__chanceOfRain-timezone3">
        <p className="time">12時</p>
        <p id="todayschanceOfRain3" className="rain">{weather.rainProbability[2].precipitation_probability
        }%</p>
      </li>
      <li className="c-weather__chanceOfRain-timezone4">
        <p className="time">18時</p>
        <p id="todayschanceOfRain4" className="rain">{weather.rainProbability[3].precipitation_probability
        }%</p>
      </li>
    </ul>
  )
};

export default TimeZone;
