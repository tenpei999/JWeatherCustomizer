// Base URL for the Open-Meteo API to fetch weather forecasts.
const apiBaseUrl = 'https://api.open-meteo.com/v1/forecast';

/**
 * Constructs a URL for fetching weather data from the Open-Meteo API for a specific latitude and longitude.
 * It specifies parameters for the API call to include temperature, precipitation probability, and weather code
 * information on an hourly and daily basis, along with the timezone setting for Asia/Tokyo.
 * 
 * @param {number} latitude - The latitude of the city.
 * @param {number} longitude - The longitude of the city.
 * @returns {string} - A complete URL string for the API call.
 */
const createCityWeatherUrl = (latitude, longitude) => {
  return `${apiBaseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&past_days=1&forecast_days=14`;
};

/**
 * A collection of cities with their names and corresponding URLs for fetching weather data.
 * Each city object contains the city name and a URL generated with the `createCityWeatherUrl`
 * function, using the city's latitude and longitude.
 */
export const cities = {

  札幌: {
    name: '札幌',
    url: createCityWeatherUrl(43.0667, 141.35),
  },
  秋田: {
    name: '秋田',
    url: createCityWeatherUrl(39.7167, 140.1167),
  },
  金沢: {
    name: '金沢',
    url: createCityWeatherUrl(36.6, 136.6167),
  },
  東京: {
    name: '東京',
    url: createCityWeatherUrl(35.6895, 139.6917),
  },
  大宮: {
    name: '大宮',
    url: createCityWeatherUrl(35.9635, 139.8305),
  },
  名古屋: {
    name: '名古屋',
    url: createCityWeatherUrl(35.1815, 136.9064),
  },
  南堀江: {
    name: '南堀江',
    url: createCityWeatherUrl(34.6711, 135.4942),
  },
  八尾: {
    name: '八尾',
    url: createCityWeatherUrl(34.6167, 135.6),
  },
  奈良: {
    name: '奈良',
    url: createCityWeatherUrl(34.685, 135.8049),
  },
  朝来: {
    name: '朝来',
    url: createCityWeatherUrl(35.2591, 134.8139),
  },
  福岡: {
    name: '福岡',
    url: createCityWeatherUrl(33.6, 130.4167),
  },
  佐世保: {
    name: '佐世保',
    url: createCityWeatherUrl(33.1683, 129.725),
  },
  諸塚: {
    name: '諸塚',
    url: createCityWeatherUrl(32.5601, 131.3198),
  },
  パリ: {
    name: 'パリ',
    url: createCityWeatherUrl(48.8534, 2.3488),
  },
};
