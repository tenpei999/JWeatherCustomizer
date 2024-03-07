// APIエラーを追跡するオブジェクト
let isApiError = {
  isError: false,
  statusCode: null
};

// 指定されたURLから天気データを非同期でフェッチする関数
async function fetchWeatherData(cityUrl) {
  const cacheDuration = 14400; // キャッシュの有効期間（秒）
  const cacheKey = 'weatherDataCache';
  const cacheUrlKey = 'weatherDataUrl'; // キャッシュされたURLを保存するためのキー
  const cacheTimestampKey = 'weatherDataTimestamp';

  // URLが有効かどうかをチェックする関数
  const isValidUrl = (url) => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      return false;
    }
  };

  // 提供されたURLの検証
  if (!cityUrl || !isValidUrl(cityUrl)) {
    throw new Error(`Invalid URL: ${cityUrl}`);
  }

  const now = new Date();
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  const storedTimestamp = localStorage.getItem(cacheTimestampKey);
  const storedUrl = localStorage.getItem(cacheUrlKey); // キャッシュされたURLを取得
  const timePassed = currentTimestamp - storedTimestamp;

  // キャッシュが存在し、有効期限内で、URLが変更されていないかをチェック
  if (localStorage.getItem(cacheKey) && timePassed < cacheDuration && storedUrl === cityUrl) {
    console.log(`Cache hit: Data fetched from cache.`);
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
      localStorage.setItem(cacheUrlKey, cityUrl); // 現在のURLをキャッシュに保存
      console.log('Data fetched from API and cache updated.');

      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};

export { fetchWeatherData, isApiError };
