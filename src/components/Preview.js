import { __ } from '@wordpress/i18n';
import { CurrentWeather } from './CurrentWeather';
import WeekWeather from './WeekWeather';
import { isApiError } from '../objects/weatherObject';
import ManagedError from './ManegedError';

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

  return (
    <>
      {isApiError.isError ? (
        <ManagedError isApiError={isApiError.statusCode} />
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
