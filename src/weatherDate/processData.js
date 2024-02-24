// processData.js
import getWeatherInfo from "../hooks/getWeatherInfo";
import dayWithHoliday from "./dayWithHoloday";

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

const processWeatherData = async (data, addBreak = false) => {
  // dataはAPIから取得した生の天気データ
  if (!data || !data.daily) {
    throw new Error("Unexpected data format received from the weather API.");
  }

  const datesForWeek = await dayWithHoliday(addBreak);
  if (!datesForWeek || datesForWeek.length !== 7) {
    throw new Error("Unexpected date array length from dayWithHoliday.");
  }

  const weatherCodesForWeek = data.daily.weathercode; // 本日から6日後までの天気コード
  const weatherNamesForWeek = weatherCodesForWeek.map(code => getWeatherInfo(code).label);
  const weatherImageForWeek = weatherCodesForWeek.map(code => sanitizeImageUrl(getWeatherInfo(code).icon));
  const highestTemperatureForWeek = data.daily.temperature_2m_max.map(temp => validateTemperature(temp) ? temp : null);
  const lowestTemperatureForWeek = data.daily.temperature_2m_min.map(temp => validateTemperature(temp) ? temp : null);

  const highestTemperatureDifferencesForWeek = highestTemperatureForWeek.map((todayMax, i, arr) => {
    const yesterdayMax = arr[i - 1] || todayMax; // 最初の日は前日のデータがないため、今日の最高温度を使用
    const difference = todayMax - yesterdayMax;
    return difference.toFixed(1);
  });

  const lowestTemperatureDifferencesForWeek = lowestTemperatureForWeek.map((todayMin, i, arr) => {
    const yesterdayMin = arr[i - 1] || todayMin; // 最初の日は前日のデータがないため、今日の最低温度を使用
    const difference = todayMin - yesterdayMin;
    return difference.toFixed(1);
  });

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

  return {
    datesForWeek,
    weatherNamesForWeek,
    weatherImageForWeek,
    highestTemperatureForWeek,
    lowestTemperatureForWeek,
    highestTemperatureDifferencesForWeek,
    lowestTemperatureDifferencesForWeek,
    rainProbability1
  };
};

export default processWeatherData;
