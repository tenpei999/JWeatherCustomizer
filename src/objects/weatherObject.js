import getWeatherInfo from "../hooks/getWeatherInfo";
import dayWithHoliday from "./dayWithHoloday";

let isApiError = {
  isError: false,
  statusCode: null
};
let apiRequestCount = 0;

const isValidUrl = (url) => {
  try {
    const validBaseUrl = "https://api.open-meteo.com/v1";
    const parsedUrl = new URL(url);
    return parsedUrl.href.startsWith(validBaseUrl);
  } catch (e) {
    return false;
  }
};

async function fetchWeatherData(cityurl) {
  if (!cityurl || !isValidUrl(cityurl)) {
    throw new Error(`City "${cityurl}" does not exist in the city object.`);
  }

  apiRequestCount++;
  isApiError.isError = false;
  isApiError.statusCode = null;
  const response = await fetch(cityurl);

  if (!response.ok) {
    isApiError.isError = true;
    isApiError.statusCode = response.status;
    throw new Error(`API response error with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

async function processWeatherData(data, addBreak = false) {

  const sanitizeImageUrl = (url) => {
    // 画像URLをサニタイズする関数。不正なURLを除去または修正
    try {
      return new URL(url).toString();
    } catch (e) {
      return ''; // 不正なURLは空文字列に置き換える
    }
  };

  const validateTemperature = (temperature) => {
    // 温度データが数値であることを検証
    return !isNaN(temperature) && isFinite(temperature);
  };
  if (!data || !data.daily) {
    throw new Error("Unexpected data format received from the weather API.");
  }

  const datesForWeek = await dayWithHoliday(addBreak);
  if (!datesForWeek || datesForWeek.length !== 7) {
    throw new Error("Unexpected date array length from dayWithHoliday.");
  }
  
  const weatherCodesForWeek = data.daily.weathercode; // 本日から6日後までの天気コード

  // 天気コードを天気名に変換
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
  
  const dailyData = weatherNamesForWeek.map((name, index) => ({
    day: datesForWeek[index],
    name,
    image: weatherImageForWeek[index],
    highestTemperature: highestTemperatureForWeek[index],
    lowestTemperature: lowestTemperatureForWeek[index],
    maximumTemperatureComparison: highestTemperatureDifferencesForWeek[index],
    lowestTemperatureComparison: lowestTemperatureDifferencesForWeek[index],
    rainProbability: rainProbability1[index + 1], // インデックス調整
  }));

  // 加工された全データを返す
  return {
    dailyData, // 加工された日毎の天気データ
  };
}


const weatherObject = async (
  cityurl,
  setTodayWeather,
  setTomorrowWeather,
  setWeeklyWeather,
  addBreak = false
) => {


  try {
    const data = await fetchWeatherData(cityurl);
    const { dailyData } = await processWeatherData(data, addBreak);

    if (!cityurl || !isValidUrl(cityurl)) {
      throw new Error(`City "${cityurl}" does not exist in the city object.`);
    }
    const apiUrl = JWeatherCustomizerData.siteUrl + '/wp-json/j-weather-customizer/save-data/';

    // console.log('Making request to weather API for city:', cityurl); // API呼び出し前のログ

    const validateWeatherData = (data) => {
      // 天気データの構造を検証する関数
      return data && data.daily && Array.isArray(data.daily.weathercode) && Array.isArray(data.daily.temperature_2m_max);
    };

    [setTodayWeather, setTomorrowWeather, setWeeklyWeather].forEach((func) => {
      if (typeof func !== 'function') {
        throw new Error("One of the weather setter functions is not a function.");
      }
    });

    if (!validateWeatherData(data)) {
      throw new Error("Invalid weather data format.");
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

    const postResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': JWeatherCustomizerData.nonce // nonceをヘッダーに追加
      },
      body: JSON.stringify({ dailyData: dailyData })
    });

    if (!postResponse.ok) {
      console.error(`Failed to post data to ${apiUrl}. Status: ${postResponse.status}`);
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
    isApiError.statusCode = error.status || 400;

  }
}

export { weatherObject, isApiError };