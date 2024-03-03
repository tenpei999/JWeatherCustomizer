// APIエラーを追跡するオブジェクト
let isApiError = {
  isError: false,
  statusCode: null
};

// 指定されたURLから天気データを非同期でフェッチする関数
async function fetchWeatherData(cityurl) {
  // キャッシュの有効期間（秒）
  const cacheDuration = 14400;
  const cacheKey = 'weatherDataCache';
  const cacheTimestampKey = 'weatherDataTimestamp';

  // URLが有効かどうかをチェックする関数
  const isValidUrl = (url) => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      // URLがベースURLで始まるかどうかをチェック
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      // URL解析に失敗した場合はfalseを返す
      return false;
    }
  };

  // 提供されたURLの検証
  if (!cityurl || !isValidUrl(cityurl)) {
    throw new Error(`City "${cityurl}" does not exist in the city object.`);
  }

  // 現在のタイムスタンプを取得（秒単位）
  const now = new Date();
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  // 保存されたタイムスタンプを取得
  const storedTimestamp = localStorage.getItem(cacheTimestampKey);
  // 現在時刻と保存されたタイムスタンプの差
  const timePassed = currentTimestamp - storedTimestamp;

  // キャッシュが存在し、有効期限内で、同じ日付であるかをチェック
  if (localStorage.getItem(cacheKey) && timePassed < cacheDuration && now.toDateString() === new Date(storedTimestamp * 1000).toDateString()) {
    console.log(`Cache hit: Data fetched from cache. Time passed since last cache: ${timePassed} seconds.`);
    // キャッシュされたデータを返す
    return JSON.parse(localStorage.getItem(cacheKey));
  } else {
    // APIからデータを取得する前にエラー状態をリセット
    isApiError.isError = false;
    isApiError.statusCode = null;


    try {
      const response = await fetch(cityurl);
      // レスポンスが成功かどうかをチェック
      if (!response.ok) {
        isApiError.isError = true;
        isApiError.statusCode = response.status;
        throw new Error(`API response error with status: ${response.status}`);
      }

      // レスポンスからデータを取得
      const data = await response.json();
      // 取得したデータをlocalStorageに保存
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimestampKey, currentTimestamp.toString());
      console.log('Cache update: Data fetched from API and cache updated.');

      // 取得したデータを返す
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

};

export { fetchWeatherData, isApiError };
