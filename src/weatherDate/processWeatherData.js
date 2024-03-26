import getWeatherInfo from "../hooks/getWeatherInfo";
import dayWithHoliday from "./dayWithHoloday";

async function processWeatherData(data, addBreak = false) {

  const sanitizeImageUrl = (url) => {
    try {
      return new URL(url).toString();
    } catch (e) {
      return '';
    }
  };

  const validateTemperature = (temperature) => {
    return !isNaN(temperature) && isFinite(temperature);
  };
  if (!data || !data.daily) {
    throw new Error("Unexpected data format received from the weather API.");
  }
  const datesForWeek = await dayWithHoliday(addBreak);
  if (!datesForWeek || datesForWeek.length !== 7) {
    throw new Error("Unexpected date array length from dayWithHoliday.");
  };

  const weatherCodesForWeek = data.daily.weathercode;
  const weatherNamesForWeek = weatherCodesForWeek.map(code => getWeatherInfo(code).label);
  const weatherImageForWeek = weatherCodesForWeek.map(code => sanitizeImageUrl(getWeatherInfo(code).icon));
  const highestTemperatureForWeek = data.daily.temperature_2m_max.map(temp => validateTemperature(temp) ? temp : null);
  const lowestTemperatureForWeek = data.daily.temperature_2m_min.map(temp => validateTemperature(temp) ? temp : null);
  const highestTemperatureDifferencesForWeek = [];

  for (let i = -1; i < highestTemperatureForWeek.length; i++) {
    const todayMaxTemperature = highestTemperatureForWeek[i + 1];
    const yesterdayMaxTemperature = highestTemperatureForWeek[i];
    const temperatureDifference = Math.ceil((todayMaxTemperature - yesterdayMaxTemperature) * 10) / 10;
    const formattedDifference = (temperatureDifference >= 0) ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;
    highestTemperatureDifferencesForWeek.push(formattedDifference);
  }

  const lowestTemperatureDifferencesForWeek = [];

  for (let i = -1; i < lowestTemperatureForWeek.length; i++) {
    const todayMinTemperature = lowestTemperatureForWeek[i + 1];
    const yesterdayMinTemperature = lowestTemperatureForWeek[i];
    const temperatureDifference = Math.ceil((todayMinTemperature - yesterdayMinTemperature) * 10) / 10;
    const formattedDifference = (temperatureDifference >= 0) ? `(+${temperatureDifference})` : `(-${Math.abs(temperatureDifference)})`;

    lowestTemperatureDifferencesForWeek.push(formattedDifference);
  }

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

  return {
    dailyData,
  };
};

export default processWeatherData;
