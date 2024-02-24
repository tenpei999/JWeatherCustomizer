async function updateUIAndSaveData(cityurl, setTodayWeather, setTomorrowWeather, setWeeklyWeather, addBreak) {
  try {
    const data = await fetchWeatherData(cityurl);
    const { dailyData } = await processWeatherData(data, addBreak);

    // UIを更新
    setTodayWeather(dailyData[0]);
    setTomorrowWeather(dailyData[1]);
    setWeeklyWeather(dailyData.slice(2, 7));

    // サーバーに保存
    await saveWeatherDataToServer(dailyData);

  } catch (error) {
    console.error('Error in updateUIAndSaveData:', error);
  }
}

export default updateUIAndSaveData;