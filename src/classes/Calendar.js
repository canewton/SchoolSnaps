import { Dimensions } from "react-native";

export class Calendar {
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

  static getDayDataArray(month, year) {
    const daysThisMonth = this.getDaysInMonth(month, year);
    const daysLastMonth =
      month !== 0
        ? this.getDaysInMonth(month - 1, year)
        : this.getDaysInMonth(11, year - 1);

    const firstDayOfCurrentMonthInWeek = new Date(year, month, 1).getDay();
    const daysLastMonthToDisplay =
      firstDayOfCurrentMonthInWeek !== 6 ? firstDayOfCurrentMonthInWeek : 6;

    const lastDayOfCurrentMonthInWeek = new Date(year, month, daysThisMonth).getDay();
    const daysNextMonthToDisplay =
      lastDayOfCurrentMonthInWeek !== 6 ? 6 - lastDayOfCurrentMonthInWeek : 0;

    var dayDataArray = [
      ...this.getDaysLastMonthToDisplay(daysLastMonthToDisplay, daysLastMonth),
      ...this.getDaysThisMonthToDisplay(daysThisMonth),
      ...this.getDaysNextMonthToDisplay(daysNextMonthToDisplay),
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
