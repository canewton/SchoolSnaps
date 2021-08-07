import React, { useState, useRef } from "react";
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
  const spaceBetweenPages = 20;

  const weekCalendarFlatListRef = React.useRef();
  const monthCalendarFlatListRef = React.useRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  if (!singletonHasRun) {
    Calendar.getFollowingMonths(
      currentMonth,
      currentYear,
      numberOfMonths,
      setMonthDataArray,
      []
    );
    setSingletonHasRun(true);
  }

  return (
    <View>
      <SwipeView
        lowerHeight={100}
        upperHeight={350}
        lowerComponent={
          <WeekdayCalendar
            monthDataArray={monthDataArray}
            spaceBetweenPages={spaceBetweenPages}
            monthCalendarFlatListRef={monthCalendarFlatListRef}
            weekCalendarFlatListRef={weekCalendarFlatListRef}
          />
        }
        upperComponent={
          <CalendarDisplay
            monthDataArray={monthDataArray}
            spaceBetweenPages={spaceBetweenPages}
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
