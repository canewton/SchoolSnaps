import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import Calendar from "../calendar/Calendar";
import SwipeView from "../components/SwipeView";
import WeekdayCalendar from "../calendar/WeekdayCalendar";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const numberOfMonths = 12 * 1 + 1;
  const [monthDataArray, setMonthDataArray] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  useEffect(() => {
    getFollowingMonths(currentMonth, currentYear, numberOfMonths, []);
  }, []);

  const getFollowingMonths = (
    currentMonth,
    currentYear,
    numberOfMonths,
    monthDataArrayInput
  ) => {
    if (numberOfMonths === 0) {
      setMonthDataArray(monthDataArrayInput);
      return;
    }

    monthDataArrayInput.push({ month: currentMonth, year: currentYear });

    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }

    numberOfMonths -= 1;
    getFollowingMonths(currentMonth, currentYear, numberOfMonths, monthDataArrayInput);
  };

  return (
    <View>
      <SwipeView
        lowerHeight={150}
        upperHeight={350}
        lowerComponent={<WeekdayCalendar />}
        upperComponent={<Calendar monthDataArray={monthDataArray} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
