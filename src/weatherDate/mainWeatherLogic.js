import { fetchWeatherData } from "./fetchWeatherData";
import processWeatherData from "./processWeatherData";


/**
 * Orchestrates the fetching and processing of weather data for a specific city and updates
 * state hooks for today's, tomorrow's, and the weekly weather forecasts.
 * 
 * @param {string} cityurl - The URL to fetch weather data for a specific city.
 * @param {Function} setTodayWeather - State setter function for today's weather.
 * @param {Function} setTomorrowWeather - State setter function for tomorrow's weather.
 * @param {Function} setWeeklyWeather - State setter function for the weekly weather forecast.
 * @param {boolean} addBreak - Optional parameter indicating whether to add a break in the processing of weather data.
 */
async function mainWeatherLogic(
  cityurl,
  setTodayWeather,
  setTomorrowWeather,
  setWeeklyWeather,
  addBreak = false
) {
  try {
    // Fetch raw weather data from the provided city URL.
    const rawData = await fetchWeatherData(cityurl);
    // Process the raw weather data, optionally adding breaks based on the addBreak parameter.
    const processedData = await processWeatherData(rawData, addBreak);

    // Update the state for today's weather using the first item from the processed daily data.
    setTodayWeather(processedData.dailyData[0]);
    // Update the state for tomorrow's weather using the second item from the processed daily data.
    setTomorrowWeather(processedData.dailyData[1]);
    // Update the state for the weekly weather forecast using the rest of the items from the processed daily data.
    setWeeklyWeather(processedData.dailyData.slice(2));

  } catch (error) {
    // Log any errors that occur during the fetching or processing of weather data.
    console.error('Error in weatherObject function:', error);
  }
};

export { mainWeatherLogic };