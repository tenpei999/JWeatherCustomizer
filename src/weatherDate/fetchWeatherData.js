let isApiError = {
isError: false,
statusCode: null
};

async function fetchWeatherData(cityurl) {


  const isValidUrl = (url) => {
    try {
      const validBaseUrl = "https://api.open-meteo.com/v1";
      const parsedUrl = new URL(url);
      return parsedUrl.href.startsWith(validBaseUrl);
    } catch (e) {
      return false;
    }
  };

let apiRequestCount = 0;


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

export { fetchWeatherData, isApiError };
