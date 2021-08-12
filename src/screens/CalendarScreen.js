import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CalendarDisplay from "../calendar/CalendarDisplay";
import SwipeView from "../components/SwipeView";
import WeekdayCalendar from "../calendar/WeekdayCalendar";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [monthDataArray, setMonthDataArray] = useState([]);
  const [singletonHasRun, setSingletonHasRun] = useState(false);
  const [weeksArray, setWeeksArray] = useState();

  const weekCalendarFlatListRef = React.useRef();
  const monthCalendarFlatListRef = React.useRef();

  if (!singletonHasRun) {
    const monthArray = Calendar.getFollowingMonths(
      Calendar.currentMonth,
      Calendar.currentYear,
      Calendar.numberOfFutureMonthsToDisplay
    );

    const dayDataArray = Calendar.getAllDaysOfTheseMonths(monthArray);
    setWeeksArray(Calendar.breakUpDaysIntoWeeks(dayDataArray));
    setMonthDataArray(monthArray);
    setSingletonHasRun(true);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddButton
          navigation={navigation}
          destination="New Assignment"
          propsToPass={{
            monthDataArray: monthDataArray,
            weeksArray: weeksArray,
          }}
        />
      ),
    });
  });

  return (
    <View>
      <View style={styles.weekdayCalendarContainer}>
        <WeekdayCalendar
          weeksArray={weeksArray}
          spaceBetweenPages={Calendar.spaceBetweenPages}
          weekCalendarFlatListRef={weekCalendarFlatListRef}
          marginHorizontal={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekdayCalendarContainer: {
    height: 100,
    backgroundColor: "white",
    ...Colors.shadow,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default CalendarScreen;
