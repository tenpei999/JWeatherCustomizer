import { fetchWeatherData } from "./fetchWeatherData";
import processWeatherData from "./processWeatherData";

async function mainWeatherLogic(
  cityurl,
  setTodayWeather,
  setTomorrowWeather,
  setWeeklyWeather,
  addBreak = false
) {
  try {
    const rawData = await fetchWeatherData(cityurl);
    const processedData = await processWeatherData(rawData, addBreak);

    setTodayWeather(processedData.dailyData[0]);
    setTomorrowWeather(processedData.dailyData[1]);
    setWeeklyWeather(processedData.dailyData.slice(2));

  } catch (error) {
    console.error('Error in weatherObject function:', error);
  }
};

export { mainWeatherLogic };