import getWeatherInfo from "../hooks/getWeatherInfo";
import dayWithHoliday from "./dayWithHoloday";

/**
 * Processes raw weather data fetched from an API to enhance it with additional details,
 * including holiday information, validated temperatures, and computed temperature differences.
 * 
 * @param {Object} data - The raw weather data fetched from the API.
 * @param {boolean} addBreak - Optional parameter to indicate whether to add a break during processing.
 * @returns {Object} An object containing processed daily weather data.
 */
async function processWeatherData(data, addBreak = false) {

  // Sanitizes a URL to ensure it's valid. Returns an empty string if invalid.
  const sanitizeImageUrl = (url) => {
    try {
      return new URL(url).toString();
    } catch (e) {
      return '';
    }
  };

  // Validates a temperature value to ensure it's numeric.
  const validateTemperature = (temperature) => {
    return !isNaN(temperature) && isFinite(temperature);
  };

  // Throws an error if the data is in an unexpected format.
  if (!data || !data.daily) {
    throw new Error("Unexpected data format received from the weather API.");
  }

  // Fetches and processes holiday data to be combined with weather data.
  const datesForWeek = await dayWithHoliday(addBreak);
  if (!datesForWeek || datesForWeek.length !== 7) {
    throw new Error("Unexpected date array length from dayWithHoliday.");
  };

  // Maps weather codes to human-readable labels and sanitized image URLs.
  const weatherCodesForWeek = data.daily.weathercode;
  const weatherNamesForWeek = weatherCodesForWeek.map(code => getWeatherInfo(code).label);
  const weatherImageForWeek = weatherCodesForWeek.map(code => sanitizeImageUrl(getWeatherInfo(code).icon));

  // Validates and stores temperature data.
  const highestTemperatureForWeek = data.daily.temperature_2m_max.map(temp => validateTemperature(temp) ? temp : null);
  const lowestTemperatureForWeek = data.daily.temperature_2m_min.map(temp => validateTemperature(temp) ? temp : null);

  // Calculates daily temperature differences for highs.
  const highestTemperatureDifferencesForWeek = [];

  for (let i = -1; i < highestTemperatureForWeek.length; i++) {
    const todayMaxTemperature = highestTemperatureForWeek[i + 1];
    const yesterdayMaxTemperature = highestTemperatureForWeek[i];
    const temperatureDifference = Math.ceil((todayMaxTemperature - yesterdayMaxTemperature) * 10) / 10;
    const formattedDifference = (temperatureDifference >= 0) ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;
    highestTemperatureDifferencesForWeek.push(formattedDifference);
  }

  // Similar computation for lows.
  const lowestTemperatureDifferencesForWeek = [];

  for (let i = -1; i < lowestTemperatureForWeek.length; i++) {
    const todayMinTemperature = lowestTemperatureForWeek[i + 1];
    const yesterdayMinTemperature = lowestTemperatureForWeek[i];
    const temperatureDifference = Math.ceil((todayMinTemperature - yesterdayMinTemperature) * 10) / 10;
    const formattedDifference = (temperatureDifference >= 0) ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;

    lowestTemperatureDifferencesForWeek.push(formattedDifference);
  }

  // Organizes hourly precipitation probability data.
  const rainProbability1 = {};

  for (let i = 1; i <= 7; i++) {
    let baseTime = i === 0 ? 0 : 24 * (i);
    rainProbability1[i] = [];

    for (let j = 0; j < 4; j++) {
      rainProbability1[i].push({
        time: data.hourly.time[baseTime + j * 6],
        precipitation_probability: data.hourly.precipitation_probability[baseTime + j * 6]
      });
    }
  }

  // Combines all processed data into a structured format for each day of the week.
  const dailyData = datesForWeek.map((day, index) => {
    return {
      day: datesForWeek[index],
      name: weatherNamesForWeek[index + 1],
      image: weatherImageForWeek[index + 1],
      highestTemperature: highestTemperatureForWeek[index + 1],
      lowestTemperature: lowestTemperatureForWeek[index + 1],
      maximumTemperatureComparison: highestTemperatureDifferencesForWeek[index + 1],
      lowestTemperatureComparison: lowestTemperatureDifferencesForWeek[index + 1],
      rainProbability: rainProbability1[index + 1],
    }
  }).filter((_, index) => index < datesForWeek.length);

  // Returns the structured daily weather data which now includes additional details
  // such as holiday information, validated temperatures, computed temperature differences,
  // and organized precipitation probability data.
  return {
    dailyData,
  };
};

export default processWeatherData;
