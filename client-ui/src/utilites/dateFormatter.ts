import dayjs, { Dayjs } from "dayjs";

export const formatStartAndEndDates = (startDate: string, endDate: string) => {
  const oneMonth = dayjs(startDate).isSame(endDate, 'month');
  const oneYear = dayjs(startDate).isSame(endDate, 'year');

  if (oneMonth && oneYear) {
    return `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('DD, YYYY')}`;
  } else if (!oneMonth && oneYear) {
    return `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('MMM DD, YYYY')}`;
  } else {
    return `${dayjs(startDate).format('MMM DD, YYYY')} - ${dayjs(endDate).format('MMM DD, YYYY')}`;
  }
};

export const formatMessageDate = (date: string) => {
  const isToday = dayjs(date).isSame(dayjs(), 'day');
  const isWeek = dayjs(date).isSame(dayjs(), 'week');

  return isToday ? 'Today' : isWeek ? dayjs(date).format('MMM') : dayjs(date).format('DD MMM, YYYY');
}
