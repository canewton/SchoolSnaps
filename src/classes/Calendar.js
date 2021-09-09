import { Dimensions } from "react-native";

export class Calendar {
  static currentDate = new Date().getDate();
  static currentMonth = new Date().getMonth();
  static currentYear = new Date().getFullYear();
  static numberOfFutureMonthsToDisplay = 12;
  static spaceBetweenPages = 20;
  static viewWidth = Dimensions.get("window").width;
  static monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  static weekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  static getDateInWords(date) {
    return date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
      ? "Today, " + this.monthNames[date.getMonth()] + " " + date.getDate()
      : this.weekNames[date.getDay()] +
          ", " +
          this.monthNames[date.getMonth()] +
          " " +
          date.getDate();
  }
}
