let isApiError = {
  isError: false,
  statusCode: null
};

async function fetchWeatherData(cityurl) {
  const cacheDuration = 14400; // キャッシュの有効期限（秒）
  const cacheKey = 'weatherDataCache'; // localStorageで使用するキャッシュのキー
  const cacheTimestampKey = 'weatherDataTimestamp'; // キャッシュのタイムスタンプを保存するキー

  const isValidUrl = (url) => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      return false;
    }
  };

  if (!cityurl || !isValidUrl(cityurl)) {
    throw new Error(`City "${cityurl}" does not exist in the city object.`);
  }

  const now = new Date();
  const currentTimestamp = Math.floor(now.getTime() / 1000); // 現在のUNIXタイムスタンプ（秒）
  const storedTimestamp = localStorage.getItem(cacheTimestampKey);
  const timePassed = currentTimestamp - storedTimestamp;

  if (localStorage.getItem(cacheKey) && timePassed < cacheDuration && now.toDateString() === new Date(storedTimestamp * 1000).toDateString()) {
    // キャッシュからデータを取得
    console.log(`Cache hit: Data fetched from cache. Time passed since last cache: ${timePassed} seconds.`);
    return JSON.parse(localStorage.getItem(cacheKey));
  } else {
    // APIからデータを取得
    isApiError.isError = false;
    isApiError.statusCode = null;

    try {
      const response = await fetch(cityurl);
      if (!response.ok) {
        isApiError.isError = true;
        isApiError.statusCode = response.status;
        throw new Error(`API response error with status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimestampKey, currentTimestamp.toString());
      console.log('Cache update: Data fetched from API and cache updated.');

      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // エラーを再スローして、呼び出し元で処理できるようにする
    }
  }
};

export { fetchWeatherData, isApiError };
