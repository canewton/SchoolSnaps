import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Calendar } from "../classes/Calendar";

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
    <View>
      <FlatList
        data={weeksArray}
        keyExtractor={(index) => index[0].calendarDayIndex + ""}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={10}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginRight: 10,
                width: Dimensions.get("window").width,
                marginRight: index === weeksArray.length - 1 ? 0 : spaceBetweenPages,
                justifyContent: "center",
              }}
            >
              <Text>{item[0].dayData.day}</Text>
              <Text>{item[1].dayData.day}</Text>
              <Text>{item[2].dayData.day}</Text>
              <Text>{item[3].dayData.day}</Text>
              <Text>{item[4].dayData.day}</Text>
              <Text>{item[5].dayData.day}</Text>
              <Text>{item[6].dayData.day}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default WeekdayCalendar;
