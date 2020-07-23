import moment from 'moment';

export const getCanBook = (startDate: Date, endDate: Date): boolean => {
  if (!startDate || !endDate) return false;
  return moment().isBetween(moment(startDate), moment(endDate));
};
