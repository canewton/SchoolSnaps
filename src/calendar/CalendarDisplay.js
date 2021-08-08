import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import MonthToDisplay from "./MonthToDisplay";

const CalendarDisplay = ({
  weeksArray,
  monthDataArray,
  spaceBetweenPages,
  monthCalendarFlatListRef,
  weekCalendarFlatListRef,
}) => {
  const [monthsArray, setMonthsArray] = useState([]);
  const [singletonHasRun, setSingletonHasRun] = useState(false);

  const getMonthWeeksByMonthIndex = (monthIndex) => {
    var startingIndex = { value: 0 };
    var monthArray = [];
    for (let i = startingIndex.value; i < weeksArray.length; i++) {
      if (weeksArray[i].findIndex((day) => day.monthIndex === monthIndex) >= 0) {
        monthArray.push(weeksArray[i]);
        startingIndex.value++;
      }
    }
    startingIndex.value--;
    return monthArray;
  };

  if (!singletonHasRun) {
    var monthsArrayInSingleton = [];
    for (let i = 0; i < monthDataArray.length; i++) {
      monthsArrayInSingleton.push(getMonthWeeksByMonthIndex(i));
    }
    setMonthsArray(monthsArrayInSingleton);
    setSingletonHasRun(true);
  }

  return (
    <View>
      <FlatList
        data={monthDataArray}
        ref={monthCalendarFlatListRef}
        keyExtractor={(index) => index.month + "" + index.year}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width - 20 + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={10}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MonthToDisplay
                style={{
                  width: Dimensions.get("window").width - 20,
                  marginRight:
                    index === monthDataArray.length - 1 ? 0 : spaceBetweenPages,
                  justifyContent: "center",
                }}
                monthDaysArray={monthsArray[index]}
                monthData={item}
                weekCalendarFlatListRef={weekCalendarFlatListRef}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarDisplay;
