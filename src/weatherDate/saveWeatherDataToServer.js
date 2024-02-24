async function saveWeatherDataToServer(dailyData) {
  const apiUrl = JWeatherCustomizerData.siteUrl + '/wp-json/j-weather-customizer/save-data/';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': JWeatherCustomizerData.nonce
      },
      body: JSON.stringify({ dailyData })
    });

    if (!response.ok) {
      throw new Error(`Failed to post data. Status: ${response.status}`);
    }
    console.log('Data successfully saved to the server.');
  } catch (error) {
    console.error('Failed to save data to the server:', error);
  }
}

export default saveWeatherDataToServer;