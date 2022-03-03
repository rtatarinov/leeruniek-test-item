import dayjs from "dayjs";

export const formatDate = (
  date: string | Date,
  format = "DD.MM.YYYY"
): string | null => {
  if (!date) {
    return null;
  }

  if (!dayjs(date).isValid()) {
    return "Invalid date";
  }

  return dayjs(date).format(format);
};

export const compareDate = (
  date1: string | Date,
  date2: string | Date
): number => {
  const first = dayjs(date1);
  const second = dayjs(date2);

  return first.diff(second);
};
