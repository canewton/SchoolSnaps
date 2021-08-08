import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Colors } from "../classes/Colors";
import { Context as CalendarContext } from "../context/CalendarContext";

const DaysInMonth = (props) => {
  const specialDates = useContext(CalendarContext);
  const currentCalendarDayIndex = specialDates.state[0].dateObject.calendarDayIndex;

  const chooseDay = (dateObject) => {
    specialDates.edit({
      id: "Selected Date",
      dateObject: dateObject,
    });
    props.weekCalendarFlatListRef.current.scrollToIndex({
      index: dateObject.weekIndex,
      animated: false,
    });
  };

  return (
    <>
      {props.monthDaysArray?.map((rowData, index) => (
        <View style={{ flexDirection: "row" }} key={"calendar row " + index}>
          {rowData.map((data) => {
            if (props.monthIndex === data.monthIndex) {
              /* day holder that is of the displayed month */
              return (
                <TouchableHighlight
                  key={"day holder " + data.calendarDayIndex}
                  style={styles.dayHolderContainer}
                  underlayColor="transparent"
                  onPress={() => chooseDay(data)}
                >
                  <View
                    style={
                      data.calendarDayIndex === currentCalendarDayIndex
                        ? styles.chosenDayHolder
                        : styles.defaultDayHolder
                    }
                  >
                    <Text
                      style={
                        data.calendarDayIndex === currentCalendarDayIndex
                          ? styles.chosenDayText
                          : styles.defaultDayText
                      }
                    >
                      {data.day}
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
                      {data.day > 0 ? data.day : ""}
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
  },
  defaultDayText: {
    color: Colors.primaryColor,
  },
  chosenDayHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
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
