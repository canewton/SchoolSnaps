import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DaysInMonth from "./DaysInMonth";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";

const MonthToDisplay = (props) => {
  return (
    <View style={props.style}>
      <View style={styles.calendarMonthContainer}>
        <View style={styles.monthNameContainer}>
          <Text style={styles.monthNameText}>
            {Calendar.monthNames[props.monthData.month]}
          </Text>
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

        <DaysInMonth
          monthDaysArray={props.monthDaysArray}
          monthIndex={props.monthIndex}
          weekCalendarFlatListRef={props.weekCalendarFlatListRef}
        />
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
