import getWeatherInfo from "../data/getWeatherInfo";
import dayWithHoliday from "./dayWithHoloday";
export { isApiError };

let isApiError = {
  isError: false,
  statusCode: null
};
let apiRequestCount = 0;

const weatherObject = async (
  cityurl,
  setTodayWeather,
  setTomorrowWeather,
  setWeeklyWeather,
  addBreak = false
) => {
  try {
    if (!cityurl) {
      throw new Error(`City "${cityurl}" does not exist in the city object.`);
    }
    const apiUrl = myPluginData.siteUrl + '/wp-json/j-weather-customizer/save-data/';

    // console.log('Making request to weather API for city:', cityurl); // API呼び出し前のログ

    apiRequestCount++;
    console.log(`リクエスト回数: ${apiRequestCount}`);
    const response = await fetch(cityurl);
    if (!response.ok) {
      // 429 エラーの場合、APIアクセスが制限されているとみなす
      isApiError = false;
      isApiError.statusCode = response.status;

      if (response.status === 429) {
      } else {
        throw new Error(`Failed to fetch data for city: ${cityurl}. Status: ${response.status}`);
      }
    } else {
      isApiError.isError = false;
      isApiError.statusCode = null;
    }

    const data2 = await response.json();

    if (!data2 || !data2.daily) {
      throw new Error("Unexpected data format received from the weather API.");
    }

    const datesForWeek = await dayWithHoliday(addBreak);
    if (!datesForWeek || datesForWeek.length !== 7) {
      throw new Error("Unexpected date array length from dayWithHoliday.");
    }
    const weatherCodesForWeek = data2.daily.weathercode; // 本日から6日後までの天気コード

    // 天気コードを天気名に変換
    const weatherNamesForWeek = weatherCodesForWeek.map(code => getWeatherInfo(code).label);
    const weatherImageForWeek = weatherCodesForWeek.map(code => getWeatherInfo(code).icon);
    const highestTemperatureForWeek = data2.daily.temperature_2m_max; // 昨日から6日後までの天気コード
    const lowestTemperatureForWeek = data2.daily.temperature_2m_min; // 昨日から6日後までの天気コード
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
          time: data2.hourly.time[baseTime + j * 6],
          precipitation_probability: data2.hourly.precipitation_probability[baseTime + j * 6]
        });
      }
    }

    const dailyData = weatherNamesForWeek.map((name, index) => ({
      day: datesForWeek[index],
      name,
      image: weatherImageForWeek[index + 1],
      highestTemperature: highestTemperatureForWeek[index + 1],
      lowestTemperature: lowestTemperatureForWeek[index + 1],
      maximumTemperatureComparison: highestTemperatureDifferencesForWeek[index + 1],
      lowestTemperatureComparison: lowestTemperatureDifferencesForWeek[index + 1],
      rainProbability: rainProbability1[index + 1],
    }));

    const postResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': myPluginData.nonce // nonceをヘッダーに追加
      },
      body: JSON.stringify({ dailyData: dailyData })
    });

    if (!postResponse.ok) {
      throw new Error(`Failed to post data to ${apiUrl}. Status: ${postResponse.status}`);
    }

    if (typeof setTodayWeather !== 'function') {
      throw new Error('setTodayWeather is not a function.');
    }
    if (typeof setTomorrowWeather !== 'function') {
      throw new Error('setTomorrowWeather is not a function.');
    }
    if (typeof setWeeklyWeather !== 'function') {
      throw new Error('setWeeklyWeather is not a function.');
    }

    // 属性の設定
    if (typeof setTodayWeather === 'function') {
      setTodayWeather(dailyData[0]);
    }
    if (typeof setTomorrowWeather === 'function') {
      setTomorrowWeather(dailyData[1]);
    }
    if (typeof setWeeklyWeather === 'function') {
      setWeeklyWeather(dailyData.slice(2, 7));
    }

    // オプション値の存在を確認

  } catch (error) {
    console.error('APIの呼び出しに失敗:', error);

    // エラーが発生した場合、isApiError を更新
    isApiError.isError = true;
    isApiError.statusCode = null; // ここでエラーのステータスコードをクリアするか、必要に応じて設定
  
  }
}

export { weatherObject };