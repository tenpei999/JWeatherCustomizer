import { useEffect, useState } from '@wordpress/element';
import { mainWeatherLogic } from '../weatherDate/MainWeatherLogic';

export function useChangeCity(selectedCity) {

  const [weatherData, setWeatherData] = useState({
    today: null,
    tomorrow: null,
    weekly: null,
  });

  useEffect(() => {
    async function fetchData() {
      if (!selectedCity || !selectedCity.url) {
        console.error(`No URL found for city: ${selectedCity ? selectedCity.name : "Unknown city"}`);
        return;
      }

      const cityUrl = selectedCity.url;

      await mainWeatherLogic(
        cityUrl,
        (todayWeather) => {
          setWeatherData((prevData) => ({
            ...prevData,
            today: todayWeather,
          }));
        },
        (tomorrowWeather) => {
          setWeatherData((prevData) => ({
            ...prevData,
            tomorrow: tomorrowWeather,
          }));
        },
        (weeklyWeather) => {
          setWeatherData((prevData) => ({
            ...prevData,
            weekly: weeklyWeather,
          }));
        },
      );

    }

    fetchData();
  }, [selectedCity]);
  return weatherData;
};
