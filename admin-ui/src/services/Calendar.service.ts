import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';;

dayjs.extend(weekday);

export interface Day {
  dateString: string;
  day: number;
  isCurrentMonth: boolean;
}

const dateStringFormat = 'YYYY-MM-DD';

export default class CalendarService {
  public static readonly weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  public static getCurrentMonthDays(date: Dayjs):Day[] {
    const daysInMonth = dayjs(date).daysInMonth();

    return [...Array(daysInMonth)].map((_:any, index:number) => ({
      dateString: dayjs(date).add(index, 'day').format(dateStringFormat),
      day: index + 1,
      isCurrentMonth: true
    }))
  };

  public static getPreviousMonthDays(date: Dayjs):Day[] {
    const currentMonthDays = this.getCurrentMonthDays(date);
    const firstDay = currentMonthDays[0];

    const prevMonth = dayjs(date).subtract(1, 'month');
    const firstDayOfTheMonthWeekday = dayjs(firstDay.dateString).weekday();
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

    const previousMonthLastMondayDayOfMonth = dayjs(firstDay.dateString)
      .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
      .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {

      return {
        dateString: dayjs(
          `${prevMonth.year()}-${prevMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
        ).format(dateStringFormat),
        day: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      };
    });
  }

  public static getNextMonthDays(date: Dayjs):Day[] {
    const lastDayOfTheMonthWeekday = dayjs(date).endOf('month').weekday();

    const nextMonth = dayjs(date).add(1, 'month');
    const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;
  
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_:any, index:number) => {
      return {
        dateString: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format(dateStringFormat),
        day: index + 1,
        isCurrentMonth: false
      };
    });
  }
}
