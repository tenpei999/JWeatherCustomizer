import { useState, useEffect } from '@wordpress/element';
import { weatherObject } from '../objects/weatherObject';

export const useWeatherData = (setAttributes, addBreak = false) => {
    const [cachedWeather, setCachedWeather] = useState({
        today: null,
        tomorrow: null,
        weekly: null,
    });

    useEffect(() => {
        // `cachedWeather` に基づいて属性を更新
        if (cachedWeather.today) {
            setAttributes({ todayWeather: cachedWeather.today });
        }
        if (cachedWeather.tomorrow) {
            setAttributes({ tomorrowWeather: cachedWeather.tomorrow });
        }
        if (cachedWeather.weekly && cachedWeather.weekly.length > 0) {
            setAttributes({ weeklyWeather: cachedWeather.weekly });
        }
    }, [cachedWeather, setAttributes]);

    // APIリクエストの前に `cachedWeather` の値を確認する
    console.log('APIリクエスト前のcachedWeather:', cachedWeather);

    useEffect(() => {
        // `cachedWeather` にデータがない場合のみ API リクエストを行う
        if (!cachedWeather.today || !cachedWeather.tomorrow || !cachedWeather.weekly) {
            
            const cityurl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14';
            weatherObject(
                cityurl,
                (todayData) => {
                    console.log('APIリクエスト後のtodayData:', todayData); // ログを追加
                    const updatedWeather = {
                        ...cachedWeather,
                        today: todayData,
                    };
                    console.log('APIリクエスト後のcachedWeather:', updatedWeather); 
                    setCachedWeather(updatedWeather);
                    setAttributes({
                        todayWeather: todayData,
                        showHoliday: todayData.day.isHoliday,
                        showPrecipitation: todayData.rainProbability,
                    });

                    // APIリクエストの後に `cachedWeather` の値を確認する
                    console.log('APIリクエスト後のcachedWeather:', cachedWeather);
                },
                (tomorrowData) => {
                    const updatedWeather = {
                        ...cachedWeather,
                        tomorrow: tomorrowData,
                    };
                    setCachedWeather(updatedWeather);
                    setAttributes({
                        tomorrowWeather: tomorrowData,
                        showHoliday: tomorrowData.day.isHoliday,
                        showPrecipitation: tomorrowData.rainProbability
                    });
                },
                (weeklyData) => {
                    const weeklyHolidays = weeklyData.map(data => data.day);
                    const updatedWeather = {
                        ...cachedWeather,
                        weekly: weeklyData,
                    };
                    setCachedWeather(updatedWeather);
                    setAttributes({
                        weeklyWeather: weeklyData,
                        showHoliday: weeklyHolidays,
                    });
                },
                addBreak
            );
        }
    }, [setAttributes, addBreak, cachedWeather]);

    return cachedWeather;
};
