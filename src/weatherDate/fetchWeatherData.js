// Initial state for tracking API errors.
let isApiError = {
  isError: false,
  statusCode: null
};

/**
 * Asynchronously fetches weather data for a given city URL. Implements caching to reduce API calls.
 * Updates `isApiError` state in case of fetch failure.
 * 
 * @param {string} cityUrl - The URL to fetch weather data from.
 * @returns {Promise<Object>} The fetched weather data as a JSON object.
 * @throws {Error} Throws an error if the URL is invalid or the fetch operation fails.
 */
async function fetchWeatherData(cityUrl) {
  const cacheDuration = 14400;
  const cacheKey = 'weatherDataCache';
  const cacheUrlKey = 'weatherDataUrl';
  const cacheTimestampKey = 'weatherDataTimestamp';

  // Validates if the given URL belongs to the expected base URL.
  const isValidUrl = (url) => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      return false;
    }
  };

  // Throws an error if the city URL is invalid or not provided.
  if (!cityUrl || !isValidUrl(cityUrl)) {
    throw new Error(`Invalid URL: ${cityUrl}`);
  };

  // Calculates the current timestamp and retrieves the stored timestamp from localStorage.
  const now = new Date();
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  const storedTimestamp = localStorage.getItem(cacheTimestampKey);
  const storedUrl = localStorage.getItem(cacheUrlKey);
  const timePassed = currentTimestamp - storedTimestamp;

  // Returns cached data if it's still valid and the URL matches the requested city URL.
  if (localStorage.getItem(cacheKey) && timePassed < cacheDuration && storedUrl === cityUrl) {
    return JSON.parse(localStorage.getItem(cacheKey));
  } else {
    // Resets API error state before attempting to fetch new data.
    isApiError.isError = false;
    isApiError.statusCode = null;

    try {
      // Performs the fetch operation.
      const response = await fetch(cityUrl);
      if (!response.ok) {
        isApiError.isError = true;
        isApiError.statusCode = response.status;
        throw new Error(`API response error with status: ${response.status}`);
      }

      // Stores fetched data in localStorage and updates the cache.
      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimestampKey, currentTimestamp.toString());
      localStorage.setItem(cacheUrlKey, cityUrl);

      return data;
    } catch (error) {
      // Logs and rethrows the error in case of fetch failure.
      console.error('Fetch error:', error);
      throw error;
    }
  }
};

export { fetchWeatherData, isApiError };
