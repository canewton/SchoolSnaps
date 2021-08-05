import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";

const WeekdayCalendar = ({ monthDataArray, spaceBetweenPages }) => {
  const [weeksArray, setWeeksArray] = useState();

  useEffect(() => {
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

  return (
    <View style={{ height: 90 }}>
      <FlatList
        data={weeksArray}
        keyExtractor={(index) => index[0].calendarDayIndex + ""}
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
              <DayInWeekButton date={item[0].dayData.day} weekday="Sun" />
              <DayInWeekButton date={item[1].dayData.day} weekday="Mon" />
              <DayInWeekButton date={item[2].dayData.day} weekday="Tue" />
              <DayInWeekButton date={item[3].dayData.day} weekday="Wed" />
              <DayInWeekButton date={item[4].dayData.day} weekday="Thu" />
              <DayInWeekButton date={item[5].dayData.day} weekday="Fri" />
              <DayInWeekButton date={item[6].dayData.day} weekday="Sat" />
            </View>
          );
        }}
      />
    </View>
  );
};

const DayInWeekButton = ({ date, weekday }) => {
  return (
    <View style={styles.dayInWeekButton}>
      <Text style={styles.weekdayText}>{weekday}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayInWeekButton: {
    flex: 1,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  dateText: {
    color: Colors.primaryColor,
    marginTop: 12,
    fontWeight: "500",
  },
  weekdayText: {
    color: Colors.primaryColor,
    fontWeight: "200",
  },
});

export default WeekdayCalendar;
