import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DayHolder from "./DayHolder";
import DummyHolder from "./DummyHolder";

const CalendarRow = (props) => {
  //console.log(props.rowData);
  return (
    <View style={{ flexDirection: "row" }}>
      {props.rowData.map((data, index) => {
        if (data.dayData.main) {
          return (
            <DayHolder
              key={"day holder " + data.calendarDayIndex}
              day={data.dayData.day}
              calendarDayIndex={data.calendarDayIndex}
              lastCalendarDayIndex={props.lastCalendarDayIndex}
              changeCurrentCalendarDayIndex={props.changeCurrentCalendarDayIndex}
              monthIndex={props.monthIndex}
              currentMonthIndex={props.currentMonthIndex}
              setCurrentMonthIndex={props.setCurrentMonthIndex}
            />
          );
        } else {
          return (
            <DummyHolder
              key={"dummy holder " + data.calendarDayIndex}
              day={data.dayData.day}
            />
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarRow;
