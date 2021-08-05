import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DaysInMonth from "./DaysInMonth";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";

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

  useEffect(() => {
    const month = props.monthData.month;
    const year = props.monthData.year;
    var dayDataArray = Calendar.getDayDataArray(month, year);

    //After we get all neccessary data from last, current and next months, we need to fill the rest indexes will dummy data
    if (dayDataArray.length < 42) {
      for (let i = dayDataArray.length; i < 42; i++) {
        dayDataArray.push({ day: 0 });
      }
    }

    setRowsDaysArray(Calendar.breakUpDaysIntoWeeks(dayDataArray));
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
      <Text style={{ color: Colors.primaryColor, fontWeight: "200" }}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarMonthContainer: {
    paddingBottom: 15,
    paddingHorizontal: 8,
    paddingTop: 8,
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
