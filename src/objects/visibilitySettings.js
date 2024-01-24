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
      checked: attributes.showTodayWeather, // 属性から現在の値を取得
      onChange: (isChecked) => {
        // 'showTodayWeather' 属性を更新
        updateAttribute('showTodayWeather', isChecked);
      },
    },
    {
      label: '明日の天気を表示',
      checked: attributes.showTomorrowWeather,
      onChange: (isChecked) => {
        // 'showTodayWeather' 属性を更新
        updateAttribute('showTomorrowWeather', isChecked);
      },
    },
    {
      label: '週間天気を表示',
      checked: attributes.showWeeklyWeather,
      onChange: (isChecked) => {
        // 'showTodayWeather' 属性を更新
        updateAttribute('showWeeklyWeather', isChecked);
      },
    },
    {
      label: '祝日を表示',
      checked: attributes.showHoliday,
      onChange: (isChecked) => {

        updateAttribute('showHoliday', isChecked);
      }
    },
    {
      label: '降水確率を表示',
      checked: attributes.showPrecipitation,
      onChange: (isChecked) => {

        updateAttribute('showPrecipitation', isChecked);
      }
    },
  ];
};