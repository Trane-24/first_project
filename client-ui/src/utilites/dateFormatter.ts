import dayjs from "dayjs";

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
