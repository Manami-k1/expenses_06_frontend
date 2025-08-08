type CalendarDay = {
  date: number;
  weekday: number;
  isToday: boolean;
};

export type CalendarMonth = {
  year: number;
  month: number;
  dateAndWeeks: (CalendarDay | null)[][];
};

export const createCalendar = (year: number, month: number) => {
  const newDate = new Date();
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const totalDays = endDate.getDate();
  const firstWeekday = (startDate.getDay() + 6) % 7;

  let week = [];
  let dateAndWeeks = [];

  for (let i = 0; i < firstWeekday; i++) {
    week.push(null);
  }

  for (let date = 1; date <= totalDays; date++) {
    const current = new Date(year, month - 1, date);
    const weekday = current.getDay();
    const isToday =
      newDate.getFullYear() === year &&
      newDate.getMonth() + 1 === month &&
      newDate.getDate() === date;
    week.push({
      date: date,
      weekday: weekday,
      isToday: isToday,
    });

    if (weekday === 0) {
      dateAndWeeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    dateAndWeeks.push(week);
  }

  return { year, month, dateAndWeeks };
};

export const getNextMonth = (year: number, month: number) => {
  return month === 12
    ? { year: year + 1, month: 1 }
    : { year, month: month + 1 };
};

export const getPrevMonth = (year: number, month: number) => {
  return month === 1
    ? { year: year - 1, month: 12 }
    : { year, month: month - 1 };
};
