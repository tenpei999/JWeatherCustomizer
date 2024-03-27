import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { CurrentWeather } from './CurrentWeather';
import WeekWeather from './WeekWeather';
import { isApiError } from '../weatherDate/fetchWeatherData';
import { handleWeatherError } from '../hooks/handleWeatherError';
import { ResponseError } from './ResponseError';

/**
 * The Preview component displays current and weekly weather information based on the attributes passed to it.
 * It handles API errors and displays appropriate error messages when necessary.
 * 
 * @param {Object} props The component props.
 * @param {Object} props.attributes Attributes passed from the parent component, including weather data and display preferences.
 * @param {Object} props.commonProps Common properties passed to child components.
 */
export default function Preview({ attributes, commonProps }) {
  const {
    showTodayWeather,
    showTomorrowWeather,
    showWeeklyWeather,
    todayWeather,
    tomorrowWeather,
    weeklyWeather,
    showHoliday,
    showPrecipitation
  } = attributes;

  const [errorMessage, setErrorMessage] = useState(null);

  // Effect hook to check for API errors and set an appropriate error message using a custom handler.
  useEffect(() => {
    if (isApiError.isError) {
      const message = handleWeatherError(isApiError);
      if (message) {
        setErrorMessage(message);
      }
    }
  }, [isApiError]);

  /**
  * Renders the CurrentWeather component for a given weather data set and title.
  * 
  * @param {Object} weather The weather data for the day.
  * @param {string} title The title to display for this weather data set.
  * @returns JSX.Element | null A CurrentWeather component or null if no weather data is provided.
  */
  const renderCurrentWeather = (weather, title) => {
    if (!weather || !weather.day) return null;

    const isHoliday = weather.day.isHoliday || weather.day.isSunday;
    const textColor = isHoliday ? 'red' : weather.day.isSaturday ? 'blue' : '';

    return (
      <CurrentWeather
        weather={weather}
        title={title}
        showHoliday={showHoliday}
        showPrecipitation={showPrecipitation}
        {...commonProps}
        textColor={textColor}
      />
    );
  };

  // Main render method of the Preview component. Displays an error message if there is an API error, otherwise renders weather information.
  return (
    <>
      {isApiError.isError ? (
        <ResponseError errorMessage={errorMessage} />
      ) : (
        <div className="layout">
          <div className="today-and-tomorrow weather-layout">
            {showTodayWeather && renderCurrentWeather(todayWeather, '今日の天気')}
            {showTomorrowWeather && renderCurrentWeather(tomorrowWeather, '明日の天気')}
          </div>
          {showWeeklyWeather && <WeekWeather weather={weeklyWeather} {...commonProps} />}
          <a
            href="https://open-meteo.com/"
            className={attributes.onCountGroup1 === 1 ? 'licenseOfApi-single' : 'licenseOfApi'}
          >Weather data by Open-Meteo.com</a>
          <a
            href="https://opensource.org/license/mit"
            className={attributes.onCountGroup1 === 1 ? 'licenseOfApi-single--holiday' : 'licenseOfApi'}
          >Holidays JP is licensed under the MIT license.</a>
        </div >
      )
      }
    </>
  );
};
