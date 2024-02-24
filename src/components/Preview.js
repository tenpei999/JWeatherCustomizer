import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { CurrentWeather } from './CurrentWeather';
import WeekWeather from './WeekWeather';
import { isApiError } from '../weatherDate/fetchWeatherData';
import { handleWeatherError } from '../hooks/handleWeatherError';
import { ResponseError } from './ResponseError';

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
  // isApiErrorの状態を監視
  useEffect(() => {
    if (isApiError.isError) {
      const message = handleWeatherError(isApiError);
      if (message) {
        setErrorMessage(message);
      }
    }
  }, [isApiError]); // isApiErrorが変更された時にのみ実行

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

  console.log(isApiError.isError)

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
        </div>
      )}
    </>
  );
}
