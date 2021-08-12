import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import MonthToDisplay from "./MonthToDisplay";

const CalendarDisplay = ({
  weeksArray,
  monthDataArray,
  spaceBetweenPages,
  onPressCallback,
}) => {
  const [monthsArray, setMonthsArray] = useState([]);
  const [singletonHasRun, setSingletonHasRun] = useState(false);
  const [viewWidth, setViewWidth] = useState(Dimensions.get("window").width);

  var startingIndex = { value: 0 };
  const getMonthWeeksByMonthIndex = (monthIndex) => {
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

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View>
        <MonthToDisplay
          style={{
            width: viewWidth,
            marginRight: index === monthDataArray.length - 1 ? 0 : spaceBetweenPages,
            justifyContent: "center",
          }}
          monthDaysArray={monthsArray[index]}
          monthData={item}
          monthIndex={index}
          onPressCallback={onPressCallback}
        />
      </View>
    );
  });

  const keyExtractor = useCallback((index) => index.month + "" + index.year);

  const getItemLayout = useCallback((data, index) => ({
    length: viewWidth + spaceBetweenPages,
    offset: (viewWidth + spaceBetweenPages) * index,
    index,
  }));

  return (
    <View
      style={{ height: 350 }}
      onLayout={(event) => {
        setViewWidth(event.nativeEvent.layout.width);
      }}
    >
      <FlatList
        data={monthDataArray}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={viewWidth + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarDisplay;
