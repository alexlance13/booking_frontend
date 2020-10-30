export const addDays = function (currentDate: Date, days: number): Date {
  var date = new Date(currentDate.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export default function getDatesBetween(startDate: Date, stopDate: Date): Date[] {
  var dateArray = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}
