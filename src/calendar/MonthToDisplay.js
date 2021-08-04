import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DaysInMonth from "./DaysInMonth";

const MonthToDisplay = (props) => {
  const monthNames = [
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

  const [rowDaysArray, setRowsDaysArray] = useState([]);

  const getDaysInMonth = (month, year) => {
    //Month should be incremented by 1 because the 'month' parameter is the month index (1-12 changed to 0-11)
    //to get total days of the wanted month.
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysLastMonthToDisplay = (daysLastMonthToDisplay, daysLastMonth) => {
    var daysLastMonthArray = [];
    for (let i = daysLastMonth - daysLastMonthToDisplay + 1; i <= daysLastMonth; i++) {
      daysLastMonthArray.push({ day: i });
    }
    return daysLastMonthArray;
  };

  const getDaysThisMonthToDisplay = (daysThisMonth) => {
    var daysThisMonthArray = [];
    for (let i = 1; i <= daysThisMonth; i++) {
      daysThisMonthArray.push({ day: i, main: true });
    }
    return daysThisMonthArray;
  };

  const getDaysNextMonthToDisplay = (daysNextMonthToDisplay) => {
    var daysNextMonthArray = [];
    for (let i = 1; i <= daysNextMonthToDisplay; i++) {
      daysNextMonthArray.push({ day: i });
    }
    return daysNextMonthArray;
  };

  useEffect(() => {
    const month = props.monthData.month;
    const year = props.monthData.year;
    const daysThisMonth = getDaysInMonth(month, year);
    const daysLastMonth =
      month !== 0 ? getDaysInMonth(month - 1, year) : getDaysInMonth(11, year - 1);

    const firstDayOfCurrentMonthInWeek = new Date(year, month, 1).getDay();
    const daysLastMonthToDisplay =
      firstDayOfCurrentMonthInWeek !== 6 ? firstDayOfCurrentMonthInWeek : 6;

    const lastDayOfCurrentMonthInWeek = new Date(year, month, daysThisMonth).getDay();
    const daysNextMonthToDisplay =
      lastDayOfCurrentMonthInWeek !== 6 ? 6 - lastDayOfCurrentMonthInWeek : 0;

    var dayDataArray = [
      ...getDaysLastMonthToDisplay(daysLastMonthToDisplay, daysLastMonth),
      ...getDaysThisMonthToDisplay(daysThisMonth),
      ...getDaysNextMonthToDisplay(daysNextMonthToDisplay),
    ];

    //After we get all neccessary data from last, current and next months, we need to fill the rest indexes will dummy data
    if (dayDataArray.length < 42) {
      for (let i = dayDataArray.length; i < 42; i++) {
        dayDataArray.push({ day: 0 });
      }
    }

    //This array will hold data of 7 days in a row for displaying the month calendar (there are 6 rows in total)
    var dataToBeAdded = [
      new Array(7),
      new Array(7),
      new Array(7),
      new Array(7),
      new Array(7),
      new Array(7),
    ];

    //populate the 2D array with values from dayDataArray
    var dayDataArrayIndex = 0;
    for (let i = 0; i < dataToBeAdded.length; i++) {
      for (let j = 0; j < 7; j++) {
        dataToBeAdded[i][j] = {
          dayData: dayDataArray[dayDataArrayIndex],
          calendarDayIndex: dayDataArrayIndex,
        };
        dayDataArrayIndex++;
      }
    }

    setRowsDaysArray([...dataToBeAdded]);
  }, []);

  return (
    <View style={props.style}>
      <View style={styles.calendarMonthContainer}>
        <View style={styles.monthNameContainer}>
          <Text style={styles.monthNameText}>{monthNames[props.monthData.month]}</Text>
          <Text style={styles.yearText}>{props.monthData.year}</Text>
        </View>

        <View style={styles.daysInWeekContainer}>
          <DayInWeek day="S" />
          <DayInWeek day="M" />
          <DayInWeek day="T" />
          <DayInWeek day="W" />
          <DayInWeek day="T" />
          <DayInWeek day="F" />
          <DayInWeek day="S" />
        </View>

        <DaysInMonth rowDaysArray={rowDaysArray} monthIndex={props.monthIndex} />
      </View>
    </View>
  );
};

const DayInWeek = ({ day }) => {
  return (
    <View style={styles.dayInWeekTextContainer}>
      <Text style={{ color: "gray" }}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarMonthContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    paddingBottom: 15,
    paddingHorizontal: 8,
  },
  monthNameContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  monthNameText: {
    fontSize: 22,
    fontWeight: "500",
  },
  yearText: {
    color: "gray",
    fontSize: 14,
    marginLeft: 5,
  },
  daysInWeekContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dayInWeekTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MonthToDisplay;
