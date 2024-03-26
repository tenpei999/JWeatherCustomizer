export const createVisibilitySettings = ({ attributes, setAttributes }) => {
  const {
    showTomorrowWeather,
    showWeeklyWeather,
    showTodayWeather,
    showHoliday,
    showPrecipitation,
  } = attributes;

  const updateAttribute = (attributeName, value) => {
    if (typeof value === 'boolean') {
      setAttributes({ [attributeName]: value });
    } else {
      console.error('Invalid value type for visibility setting');
    }
  };

  return [
    {
      label: "今日の天気を表示",
      checked: showTodayWeather,
      onChange: (isChecked) => {
        updateAttribute('showTodayWeather', isChecked);
      },
    },
    {
      label: '明日の天気を表示',
      checked: showTomorrowWeather,
      onChange: (isChecked) => {
        updateAttribute('showTomorrowWeather', isChecked);
      },
    },
    {
      label: '週間天気を表示',
      checked: showWeeklyWeather,
      onChange: (isChecked) => {
        updateAttribute('showWeeklyWeather', isChecked);
      },
    },
    {
      label: '祝日を表示',
      checked: showHoliday,
      onChange: (isChecked) => {

        updateAttribute('showHoliday', isChecked);
      }
    },
    {
      label: '降水確率を表示',
      checked: showPrecipitation,
      onChange: (isChecked) => {

        updateAttribute('showPrecipitation', isChecked);
      }
    },
  ];
};