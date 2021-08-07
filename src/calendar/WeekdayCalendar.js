import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Button,
} from "react-native";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";
import { Context as CalendarContext } from "../context/CalendarContext";

const WeekdayCalendar = ({
  monthDataArray,
  spaceBetweenPages,
  weekCalendarFlatListRef,
  monthCalendarFlatListRef,
}) => {
  const [weeksArray, setWeeksArray] = useState();

  useEffect(() => {
    const firstMonth = monthDataArray[0]?.month;
    const firstYear = monthDataArray[0]?.year;
    const lastMonth = monthDataArray[monthDataArray.length - 1]?.month;
    const lastYear = monthDataArray[monthDataArray.length - 1]?.year;
    const lastMonthDays = Calendar.getDaysInMonth(lastMonth, lastYear);

    const monthAfterLastMonthDays =
      lastMonth !== 0
        ? Calendar.getDaysInMonth(lastMonth - 1, lastYear)
        : Calendar.getDaysInMonth(11, lastYear - 1);

    const firstDateOfFirstMonth = new Date(firstYear, firstMonth, 1).getDay();
    const numberOfPreviousMonthDaysToDisplay =
      firstDateOfFirstMonth !== 6 ? firstDateOfFirstMonth : 6;

    const lastDateOfLastMonth = new Date(lastYear, lastMonth, lastMonthDays).getDay();
    const numberOfNextMonthDaysToDisplay =
      lastDateOfLastMonth !== 6 ? 6 - lastDateOfLastMonth : 0;

    var mainDays = [];
    for (let i = 0; i < monthDataArray.length; i++) {
      for (
        let j = 1;
        j <= Calendar.getDaysInMonth(monthDataArray[i].month, monthDataArray[i].year);
        j++
      ) {
        mainDays.push({ day: j });
      }
    }

    var dayDataArray = [
      ...Calendar.getDaysLastMonthToDisplay(
        numberOfPreviousMonthDaysToDisplay,
        monthAfterLastMonthDays
      ),
      ...mainDays,
      ...Calendar.getDaysNextMonthToDisplay(numberOfNextMonthDaysToDisplay),
    ];

    setWeeksArray(Calendar.breakUpDaysIntoWeeks(dayDataArray));
  }, []);

  const DayInWeekButton = ({ date, weekday, calendarDayIndex, monthIndex }) => {
    const specialDates = useContext(CalendarContext);
    const currentCalendarDayIndex = specialDates.state[0].calendarDayIndex;
    const currentMonthIndex = specialDates.state[0].monthIndex;

    const chooseDay = (calendarDayIndex, monthIndex) => {
      specialDates.edit({
        id: "Selected Date",
        calendarDayIndex: calendarDayIndex,
        monthIndex: monthIndex,
      });
      monthCalendarFlatListRef.current.scrollToIndex({
        index: monthIndex,
        animated: false,
      });
    };

    return (
      <View style={styles.dayInWeekButton}>
        <Text style={styles.weekdayText}>{weekday}</Text>
        <TouchableHighlight
          underlayColor="transparent"
          style={
            currentCalendarDayIndex === calendarDayIndex
              ? styles.chosenDateHolder
              : styles.defaultDateHolder
          }
          onPress={() => chooseDay(calendarDayIndex, monthIndex)}
        >
          <Text
            style={
              currentCalendarDayIndex === calendarDayIndex
                ? styles.chosenDateText
                : styles.dateText
            }
          >
            {date}
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={{ height: 90 }}>
      <Button
        title="scroll"
        onPress={() =>
          weekCalendarFlatListRef.current.scrollToIndex({ index: 0, animated: false })
        }
      />
      <FlatList
        data={weeksArray}
        keyExtractor={(index) => index[0].calendarDayIndex + ""}
        ref={weekCalendarFlatListRef}
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
              <DayInWeekButton
                date={item[0].dayData.day}
                weekday="Sun"
                calendarDayIndex={item[0].calendarDayIndex}
                monthIndex={item[0].monthIndex}
              />
              <DayInWeekButton
                date={item[1].dayData.day}
                weekday="Mon"
                calendarDayIndex={item[1].calendarDayIndex}
                monthIndex={item[1].monthIndex}
              />
              <DayInWeekButton
                date={item[2].dayData.day}
                weekday="Tue"
                calendarDayIndex={item[2].calendarDayIndex}
                monthIndex={item[2].monthIndex}
              />
              <DayInWeekButton
                date={item[3].dayData.day}
                weekday="Wed"
                calendarDayIndex={item[3].calendarDayIndex}
                monthIndex={item[3].monthIndex}
              />
              <DayInWeekButton
                date={item[4].dayData.day}
                weekday="Thu"
                calendarDayIndex={item[4].calendarDayIndex}
                monthIndex={item[4].monthIndex}
              />
              <DayInWeekButton
                date={item[5].dayData.day}
                weekday="Fri"
                calendarDayIndex={item[5].calendarDayIndex}
                monthIndex={item[5].monthIndex}
              />
              <DayInWeekButton
                date={item[6].dayData.day}
                weekday="Sat"
                calendarDayIndex={item[6].calendarDayIndex}
                monthIndex={item[6].monthIndex}
              />
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
