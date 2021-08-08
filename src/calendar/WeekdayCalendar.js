import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Colors } from "../classes/Colors";
import { Context as CalendarContext } from "../context/CalendarContext";

const WeekdayCalendar = ({
  weeksArray,
  spaceBetweenPages,
  weekCalendarFlatListRef,
  monthCalendarFlatListRef,
}) => {
  const specialDates = useContext(CalendarContext);

  const DayInWeekButton = ({ weekday, dateObject }) => {
    const currentCalendarDayIndex = specialDates.state[0].dateObject.calendarDayIndex;

    const chooseDay = (dateObject) => {
      specialDates.edit({
        id: "Selected Date",
        dateObject: dateObject,
      });
      monthCalendarFlatListRef.current.scrollToIndex({
        index: dateObject.monthIndex,
        animated: false,
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

  return (
    <View style={{ height: 90 }}>
      <FlatList
        data={weeksArray}
        keyExtractor={(index) => index[0].calendarDayIndex + ""}
        ref={weekCalendarFlatListRef}
        scrollEnabled={false}
        //initialScrollIndex={specialDates.state[0].dateObject.weekIndex}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width - 20 + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={10}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: Dimensions.get("window").width - 20,
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
          );
        }}
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
