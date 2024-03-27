import { useEffect, useState } from '@wordpress/element';
import { mainWeatherLogic } from '../weatherDate/MainWeatherLogic';

/**
 * A custom hook for fetching and updating weather data based on the selected city.
 * It utilizes the `mainWeatherLogic` function to retrieve weather data for today,
 * tomorrow, and the weekly forecast, then updates the component state accordingly.
 * 
 * @param {Object} selectedCity - The city object for which weather data is to be fetched. Must contain a 'url' property.
 * @returns {Object} An object containing weather data for today, tomorrow, and the weekly forecast.
 */
export function useChangeCity(selectedCity) {

   // Initializes the state with null values for today, tomorrow, and weekly weather data.
  const [weatherData, setWeatherData] = useState({
    today: null,
    tomorrow: null,
    weekly: null,
  });

  // Effect hook that triggers whenever the selectedCity changes.
  useEffect(() => {
    async function fetchData() {

      // Checks if the selected city is valid and has a URL for fetching data.
      if (!selectedCity || !selectedCity.url) {
        console.error(`No URL found for city: ${selectedCity ? selectedCity.name : "Unknown city"}`);
        return;
      }

      const cityUrl = selectedCity.url;

        // Calls `mainWeatherLogic` with the city URL and callback functions to update the state with new weather data.
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

    fetchData(); // Calls fetchData to execute the data retrieval.
  }, [selectedCity]); // Dependency array to re-run the effect if selectedCity changes.
  return weatherData;
};
