import React, { useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Button,
} from "react-native";
import { Colors } from "../classes/Colors";
import { Context as CalendarContext } from "../context/CalendarContext";
import { Calendar } from "../classes/Calendar";

const WeekdayCalendar = ({
  weeksArray,
  spaceBetweenPages,
  weekCalendarFlatListRef,
  marginHorizontal,
}) => {
  const specialDates = useContext(CalendarContext);
  const viewWidth = Dimensions.get("window").width - marginHorizontal * 2;

  const DayInWeekButton = ({ weekday, dateObject }) => {
    const currentCalendarDayIndex = specialDates.state[0].dateObject.calendarDayIndex;

    const chooseDay = (dateObject) => {
      specialDates.edit({
        id: "Selected Date",
        dateObject: dateObject,
      });
    };

    return (
      <View style={styles.dayInWeekButton}>
        <Text style={styles.weekdayText}>{weekday}</Text>
        <TouchableHighlight
          underlayColor="transparent"
          style={
            currentCalendarDayIndex === dateObject.calendarDayIndex
              ? styles.chosenDateHolder
              : styles.defaultDateHolder
          }
          onPress={() => chooseDay(dateObject)}
        >
          <Text
            style={
              currentCalendarDayIndex === dateObject.calendarDayIndex
                ? styles.chosenDateText
                : styles.dateText
            }
          >
            {dateObject.day}
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

  const renderItem = useCallback(({ item, index }) => (
    <View
      style={{
        width: viewWidth,
        marginRight: index === weeksArray.length - 1 ? 0 : spaceBetweenPages,
        flexDirection: "row",
        paddingHorizontal: 10,
      }}
    >
      <DayInWeekButton dateObject={item[0]} weekday="Sun" />
      <DayInWeekButton dateObject={item[1]} weekday="Mon" />
      <DayInWeekButton dateObject={item[2]} weekday="Tue" />
      <DayInWeekButton dateObject={item[3]} weekday="Wed" />
      <DayInWeekButton dateObject={item[4]} weekday="Thu" />
      <DayInWeekButton dateObject={item[5]} weekday="Fri" />
      <DayInWeekButton dateObject={item[6]} weekday="Sat" />
    </View>
  ));

  const keyExtractor = useCallback((item) => item[0].calendarDayIndex + "");

  const onScrollToIndexFailed = useCallback((info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      weekCalendarFlatListRef.current?.scrollToIndex({
        offset: info.index,
        animated: false,
      });
    });
  });

  const getItemLayout = useCallback((data, index) => ({
    length: viewWidth + spaceBetweenPages,
    offset: (viewWidth + spaceBetweenPages) * index,
    index,
  }));

  return (
    <View style={{ height: 90, marginHorizontal: marginHorizontal }}>
      {/* <Button
        title="scroll"
        onPress={() => weekCalendarFlatListRef.current.scrollToIndex({ index: 3 })}
      /> */}
      <FlatList
        data={weeksArray}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        ref={weekCalendarFlatListRef}
        initialScrollIndex={specialDates.state[0].dateObject.weekIndex}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={viewWidth + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dayInWeekButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  dateText: {
    color: Colors.primaryColor,
  },
  chosenDateText: {
    color: "white",
  },
  chosenDateHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
  },
  defaultDateHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  weekdayText: {
    color: Colors.primaryColor,
    fontWeight: "200",
    marginBottom: 7,
  },
});

export default WeekdayCalendar;
