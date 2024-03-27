/**
 * Asynchronously fetches holiday data from a public API and returns dates for one week,
 * along with holiday information for each date if available. Optionally, a break can be added between
 * each date in the returned array.
 *
 * @param {boolean} addBreak - Whether to add a break between each date in the returned array.
 * @returns {Promise<Array>} - A promise that resolves to an array of date objects, each with holiday information.
 */

const dayWithHoliday = async (addBreak = false) => {

  // Cache object to store fetched holiday data to prevent multiple requests.
  const cache = {};

  /**
 * Fetches holiday data from the specified URL and returns it as a JSON object.
 * If the request fails, logs the error and returns an empty object.
 */
  const fetchHolidays = async () => {
    const url = 'https://holidays-jp.github.io/api/v1/date.json';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return {};
    }
  };

  /**
  * Retrieves holiday data for today from the cache or fetches it if not cached.
  */
  const getHolidays = async () => {
    const today = new Date().toISOString().slice(0, 10);
    if (!cache[today]) {
      cache[today] = await fetchHolidays();
    }
    return cache[today];
  };

  /**
  * Generates an array of dates between the specified start and end dates.
  */
  function getDateRangeArray(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  /**
   * Generates an array of dates for one week from today, each annotated with whether it's a holiday
   * (and the holiday's name if applicable), whether it's Saturday or Sunday, and the date in various formats.
   */
  async function getOneWeekDatesWithHolidays(addBreak = false) {
    const today = new Date();
    const sixDaysLater = new Date(today);
    sixDaysLater.setDate(today.getDate() + 6);
    const oneWeekDates = getDateRangeArray(today, sixDaysLater);
    const holidays = await getHolidays();
    const oneWeekDatesWithHolidays = oneWeekDates.map(date => {

      const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
      const dayOfWeek = weekDays[date.getDay()];
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return {
        date: {
          month: `${String(date.getMonth() + 1)}月`,
          day: `${String(date.getDate())}日`,
          dayOfWeek: `(${dayOfWeek})`,
          fullDate: `${String(date.getMonth() + 1)}月${String(date.getDate())}日(${dayOfWeek})`
        },
        isHoliday: !!holidays[formattedDate], // True if the date is a holiday.
        holidayName: holidays[formattedDate] || null, // The holiday's name, if it's a holiday.
        isSaturday: date.getDay() === 6, // True if the date is a Saturday.
        isSunday: date.getDay() === 0, // True if the date is a Sunday.
      };
    });
    return oneWeekDatesWithHolidays;
  }

  // Call the async function to generate the array and return its result.
  return await getOneWeekDatesWithHolidays(addBreak);
};

export default dayWithHoliday;