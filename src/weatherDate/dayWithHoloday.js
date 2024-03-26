const dayWithHoliday = async (addBreak = false) => {

  const cache = {};

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
  
  const getHolidays = async () => {
    const today = new Date().toISOString().slice(0, 10);
    if (!cache[today]) {
      cache[today] = await fetchHolidays();
    }
    return cache[today];
  };

  function getDateRangeArray(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

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
        isHoliday: !!holidays[formattedDate],
        holidayName: holidays[formattedDate] || null,
        isSaturday: date.getDay() === 6,
        isSunday: date.getDay() === 0,
      };
    });
    return oneWeekDatesWithHolidays;
  }

  return await getOneWeekDatesWithHolidays(addBreak);
};

export default dayWithHoliday;