import { __ } from '@wordpress/i18n';
import { CurrentWeather } from './CurrentWeather';
import WeekWeather from './WeekWeather';
import { isApiError } from '../objects/weatherObject';
import ErrorMessage from './ErrorMessage';
export default function Preview({ attributes, commonProps }) {

  return (
    <>
      {isApiError.isError ? (
        <ErrorMessage isApiError={isApiError.statusCode} />
      ) : (
        <div className="layout">
          <div className="today-and-tomorrow weather-layout">
            {attributes.showTodayWeather && (
              <CurrentWeather
                weather={attributes.todayWeather}
                title="今日の天気"
                showHoliday={attributes.showHoliday}
                showPrecipitation={attributes.showPrecipitation}
                {...commonProps}
              />
            )}
            {attributes.showTomorrowWeather && (
              <CurrentWeather
                weather={attributes.tomorrowWeather}
                title="明日の天気"
                showHoliday={attributes.showHoliday}
                showPrecipitation={attributes.showPrecipitation}
                {...commonProps}
              />
            )}
          </div>
          {attributes.showWeeklyWeather && (
            <WeekWeather
              weather={attributes.weeklyWeather}
              {...commonProps}
            />
          )}
        </div>
      )}
    </>
  );
}
