// getTextColor.js
const getTextColor = (weather) => {
  if (!weather || !weather.day) return null; // weather と weather.day の存在を確認

  const isHoliday = weather.day.isHoliday;

  if (isHoliday || weather.day.isSunday) {
    return "red";
  } else if (weather.day.isSaturday) {
    return "blue";
  }
  return ""; // 休日でも土曜日でも日曜日でもない場合は、デフォルトのテキスト色を使用
};

export default getTextColor;
