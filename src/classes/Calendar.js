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

  static getFollowingMonths(currentMonth, currentYear, numberOfMonths) {
    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }

    if (numberOfMonths === 1) {
      return [{ month: currentMonth - 1, year: currentYear }];
    }

    return [
      { month: currentMonth - 1, year: currentYear },
      ...this.getFollowingMonths(currentMonth, currentYear, numberOfMonths - 1),
    ];
  }

  static getDayDataFromDate(date, weeksArray, monthDataArray) {
    const firstMonthInWeeksArray = monthDataArray[weeksArray[0][0].monthIndex].month;
    const monthIndexOfDate = firstMonthInWeeksArray - date.getMonth();
    var dayIndex = date.getDay();
    var weekIndex = monthIndexOfDate * 4;
    while (
      date.getDate() !== weeksArray[weekIndex][dayIndex].day ||
      monthIndexOfDate !== weeksArray[weekIndex][dayIndex].monthIndex
    ) {
      weekIndex++;
    }
    return weeksArray[weekIndex][dayIndex];
  }

  static getDateFromDayData(dateObject, monthDataArray) {
    const currentMonth = monthDataArray[dateObject.monthIndex].month + 1;
    const currentYear = monthDataArray[dateObject.monthIndex].year;
    const currentDate = dateObject.day;
    return new Date(currentMonth + "/" + currentDate + "/" + currentYear);
  }

  static getDaysInMonth(month, year) {
    //Month should be incremented by 1 because the 'month' parameter is the month index (1-12 changed to 0-11)
    //to get total days of the wanted month.
    return new Date(year, month + 1, 0).getDate();
  }

  static getDaysLastMonthToDisplay(daysLastMonthToDisplay, daysLastMonth) {
    var daysLastMonthArray = [];
    for (let i = daysLastMonth - daysLastMonthToDisplay + 1; i <= daysLastMonth; i++) {
      daysLastMonthArray.push({ day: i });
    }
    return daysLastMonthArray;
  }

  static getDaysThisMonthToDisplay(daysThisMonth) {
    var daysThisMonthArray = [];
    for (let i = 1; i <= daysThisMonth; i++) {
      daysThisMonthArray.push({ day: i, main: true });
    }
    return daysThisMonthArray;
  }

  static getDaysNextMonthToDisplay(daysNextMonthToDisplay) {
    var daysNextMonthArray = [];
    for (let i = 1; i <= daysNextMonthToDisplay; i++) {
      daysNextMonthArray.push({ day: i });
    }
    return daysNextMonthArray;
  }

  static getAllDaysOfTheseMonths(monthArray) {
    const firstMonth = monthArray[0]?.month;
    const firstYear = monthArray[0]?.year;
    const lastMonth = monthArray[monthArray.length - 1]?.month;
    const lastYear = monthArray[monthArray.length - 1]?.year;
    const lastMonthDays = this.getDaysInMonth(lastMonth, lastYear);

    const monthAfterLastMonthDays =
      lastMonth !== 0
        ? this.getDaysInMonth(lastMonth - 1, lastYear)
        : this.getDaysInMonth(11, lastYear - 1);

    const firstDateOfFirstMonth = new Date(firstYear, firstMonth, 1).getDay();
    const numberOfPreviousMonthDaysToDisplay =
      firstDateOfFirstMonth !== 6 ? firstDateOfFirstMonth : 6;

    const lastDateOfLastMonth = new Date(lastYear, lastMonth, lastMonthDays).getDay();
    const numberOfNextMonthDaysToDisplay =
      lastDateOfLastMonth !== 6 ? 6 - lastDateOfLastMonth : 0;

    var mainDays = [];
    for (let i = 0; i < monthArray.length; i++) {
      for (
        let j = 1;
        j <= this.getDaysInMonth(monthArray[i].month, monthArray[i].year);
        j++
      ) {
        mainDays.push({ day: j });
      }
    }

    var dayDataArray = [
      ...this.getDaysLastMonthToDisplay(
        numberOfPreviousMonthDaysToDisplay,
        monthAfterLastMonthDays
      ),
      ...mainDays,
      ...this.getDaysNextMonthToDisplay(numberOfNextMonthDaysToDisplay),
    ];

    return dayDataArray;
  }

  static breakUpDaysIntoWeeks(dayDataArray) {
    const numberOfWeeks = dayDataArray.length / 7;
    var dataToBeAdded = [];

    for (let i = 0; i < numberOfWeeks; i++) {
      dataToBeAdded.push(new Array(7));
    }

    var dayDataArrayIndex = 0;
    var monthIndex = -1;
    for (let i = 0; i < dataToBeAdded.length; i++) {
      for (let j = 0; j < 7; j++) {
        if (dayDataArray[dayDataArrayIndex].day === 1) {
          monthIndex++;
        }
        dataToBeAdded[i][j] = {
          ...dayDataArray[dayDataArrayIndex],
          calendarDayIndex: dayDataArrayIndex,
          weekIndex: i,
          monthIndex: monthIndex,
        };
        dayDataArrayIndex++;
      }
    }

    return dataToBeAdded;
  }
}
