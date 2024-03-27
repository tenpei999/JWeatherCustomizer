/**
 * Determines the text color based on the provided weather conditions. 
 * The function checks if the day is a holiday or a weekend (Saturday or Sunday),
 * and assigns specific colors for these days. If the day is a holiday or Sunday,
 * 
 * @param {Object} weather - The weather object containing information about the day.
 * @returns {string} - The CSS color value as a string (e.g., "red", "blue", or an empty string for default color).
 */

const getTextColor = (weather) => {
  if (!weather || !weather.day) return null;
  const isHoliday = weather.day.isHoliday;

  // Determines if the current day is a holiday.
  if (isHoliday || weather.day.isSunday) {
    return "red";
  } else if (weather.day.isSaturday) {
    return "blue";
  }
  return "";
};

export default getTextColor;
