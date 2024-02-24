import { fetchWeatherData } from "./fetchWeatherData";
import processWeatherData from "./processWeatherData";
import saveWeatherDataToServer from "./saveWeatherDataToServer";

async function mainWeatherLogic(
  cityurl,
  setTodayWeather,
  setTomorrowWeather,
  setWeeklyWeather,
  addBreak = false
) {
  try {
    // 1. 天気データを取得
    const rawData = await fetchWeatherData(cityurl);

    // 2. 天気データを処理（加工）
    const processedData = await processWeatherData(rawData, addBreak);

    // 3. UIを更新するためのデータをセット
    setTodayWeather(processedData.dailyData[0]);
    setTomorrowWeather(processedData.dailyData[1]);
    setWeeklyWeather(processedData.dailyData.slice(2)); // 2日目以降のデータを週間天気として設定

    // 4. 処理された天気データをサーバーに保存
    await saveWeatherDataToServer(processedData.dailyData);

  } catch (error) {
    console.error('Error in weatherObject function:', error);
    // 必要に応じて、ここでエラーハンドリングを行う
  }
}

export { mainWeatherLogic };