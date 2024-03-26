let isApiError = {
  isError: false,
  statusCode: null
};

async function fetchWeatherData(cityUrl) {
  const cacheDuration = 14400;
  const cacheKey = 'weatherDataCache';
  const cacheUrlKey = 'weatherDataUrl';
  const cacheTimestampKey = 'weatherDataTimestamp';

  const isValidUrl = (url) => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      return false;
    }
  };

  if (!cityUrl || !isValidUrl(cityUrl)) {
    throw new Error(`Invalid URL: ${cityUrl}`);
  };

  const now = new Date();
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  const storedTimestamp = localStorage.getItem(cacheTimestampKey);
  const storedUrl = localStorage.getItem(cacheUrlKey);
  const timePassed = currentTimestamp - storedTimestamp;

  if (localStorage.getItem(cacheKey) && timePassed < cacheDuration && storedUrl === cityUrl) {
    return JSON.parse(localStorage.getItem(cacheKey));
  } else {
    isApiError.isError = false;
    isApiError.statusCode = null;

    try {
      const response = await fetch(cityUrl);
      if (!response.ok) {
        isApiError.isError = true;
        isApiError.statusCode = response.status;
        throw new Error(`API response error with status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimestampKey, currentTimestamp.toString());
      localStorage.setItem(cacheUrlKey, cityUrl);

      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};

export { fetchWeatherData, isApiError };
