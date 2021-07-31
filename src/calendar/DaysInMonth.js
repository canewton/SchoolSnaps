import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarRow from "./CalendarRow";

const DaysInMonth = (props) => {
  const [currentCalendarDayIndex, setCurrentCalendarDayIndex] = useState(0);
  const [lastCalendarDayIndex, setLastCalendarDayIndex] = useState(0);
  const [indexMessenger, setIndexMessenger] = useState(0);

  useEffect(() => {
    setLastCalendarDayIndex(indexMessenger);
    setIndexMessenger(currentCalendarDayIndex);
  }, [currentCalendarDayIndex]);

  //console.log(props.rowDaysArray);

  return (
    <>
      {props.rowDaysArray.map((rowData, index) => (
        <CalendarRow
          key={"calendar row " + index}
          rowData={rowData}
          lastCalendarDayIndex={lastCalendarDayIndex}
          changeCurrentCalendarDayIndex={setCurrentCalendarDayIndex}
          monthIndex={props.monthIndex}
          currentMonthIndex={props.currentMonthIndex}
          setCurrentMonthIndex={props.setCurrentMonthIndex}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({});

export default DaysInMonth;
