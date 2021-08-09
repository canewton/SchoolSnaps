import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CalendarDisplay from "../calendar/CalendarDisplay";
import SwipeView from "../components/SwipeView";
import WeekdayCalendar from "../calendar/WeekdayCalendar";
import { Calendar } from "../classes/Calendar";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const numberOfMonths = 12 * 1 + 1;
  const [monthDataArray, setMonthDataArray] = useState([]);
  const [singletonHasRun, setSingletonHasRun] = useState(false);
  const [weeksArray, setWeeksArray] = useState();

  const weekCalendarFlatListRef = React.useRef();
  const monthCalendarFlatListRef = React.useRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton navigation={navigation} destination="New Assignment" />
      ),
    });
  });

  if (!singletonHasRun) {
    const monthArray = Calendar.getFollowingMonths(
      currentMonth,
      currentYear,
      numberOfMonths
    );
    const firstMonth = monthArray[0]?.month;
    const firstYear = monthArray[0]?.year;
    const lastMonth = monthArray[monthArray.length - 1]?.month;
    const lastYear = monthArray[monthArray.length - 1]?.year;
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
    for (let i = 0; i < monthArray.length; i++) {
      for (
        let j = 1;
        j <= Calendar.getDaysInMonth(monthArray[i].month, monthArray[i].year);
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
    setMonthDataArray(monthArray);
    setSingletonHasRun(true);
  }

  return (
    <View>
      <SwipeView
        lowerHeight={100}
        upperHeight={350}
        lowerComponent={
          <WeekdayCalendar
            weeksArray={weeksArray}
            spaceBetweenPages={Calendar.spaceBetweenPages}
            monthCalendarFlatListRef={monthCalendarFlatListRef}
            weekCalendarFlatListRef={weekCalendarFlatListRef}
          />
        }
        upperComponent={
          <CalendarDisplay
            weeksArray={weeksArray}
            monthDataArray={monthDataArray}
            spaceBetweenPages={Calendar.spaceBetweenPages}
            monthCalendarFlatListRef={monthCalendarFlatListRef}
            weekCalendarFlatListRef={weekCalendarFlatListRef}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
