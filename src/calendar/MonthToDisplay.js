import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DaysInMonth from "./DaysInMonth";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";

const MonthToDisplay = ({
  style,
  monthDaysArray,
  monthIndex,
  onPressCallback,
  monthData,
}) => {
  return (
    <View style={style}>
      <View style={styles.calendarMonthContainer}>
        <View style={styles.monthNameContainer}>
          <Text style={styles.monthNameText}>{Calendar.monthNames[monthData.month]}</Text>
          <Text style={styles.yearText}>{monthData.year}</Text>
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
          monthDaysArray={monthDaysArray}
          monthIndex={monthIndex}
          onPressCallback={onPressCallback}
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
    backgroundColor: "#e9ecef",
    margin: 20,
    borderRadius: 10,
    height: 335,
  },
  monthNameContainer: {
    marginBottom: 10,
    marginTop: 10,
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
