import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Colors } from "../classes/Colors";
import { Context as CalendarContext } from "../context/CalendarContext";

const DaysInMonth = (props) => {
  const specialDates = useContext(CalendarContext);
  const currentCalendarDayIndex = specialDates.state[0].calendarDayIndex;
  const currentMonthIndex = specialDates.state[0].monthIndex;

  const chooseDay = (index) => {
    specialDates.edit({
      id: "Selected Date",
      calendarDayIndex: index,
      monthIndex: props.monthIndex,
    });
  };

  return (
    <>
      {props.rowDaysArray.map((rowData, index) => (
        <View style={{ flexDirection: "row" }} key={"calendar row " + index}>
          {rowData.map((data) => {
            if (data.dayData.main) {
              /* day holder that is of the displayed month */
              return (
                <TouchableHighlight
                  key={"day holder " + data.calendarDayIndex}
                  style={styles.dayHolderContainer}
                  underlayColor="transparent"
                  onPress={() => chooseDay(data.calendarDayIndex)}
                >
                  <View
                    style={
                      data.calendarDayIndex === currentCalendarDayIndex &&
                      props.monthIndex === currentMonthIndex
                        ? styles.chosenDayHolder
                        : styles.defaultDayHolder
                    }
                  >
                    <Text
                      style={
                        data.calendarDayIndex === currentCalendarDayIndex &&
                        props.monthIndex === currentMonthIndex
                          ? styles.chosenDayText
                          : styles.defaultDayText
                      }
                    >
                      {data.dayData.day}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            } else {
              /* day holder that is not of the displayed month */
              return (
                <View
                  key={"dummy holder " + data.calendarDayIndex}
                  style={styles.dayHolderContainer}
                >
                  <View style={styles.defaultDayHolder}>
                    <Text style={styles.dummyDayText}>
                      {data.dayData.day > 0 ? data.dayData.day : ""}
                    </Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  dayHolderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  defaultDayHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "white",
  },
  defaultDayText: {
    color: Colors.primaryColor,
  },
  chosenDayHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: Colors.primaryColor,
  },
  chosenDayText: {
    color: "white",
  },
  dummyDayText: {
    color: Colors.primaryColor,
    opacity: 0.15,
  },
});

export default DaysInMonth;
