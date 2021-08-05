import React, { useState, useEffect, useContext } from "react";
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
  const spaceBetweenPages = 20;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  useEffect(() => {
    Calendar.getFollowingMonths(
      currentMonth,
      currentYear,
      numberOfMonths,
      setMonthDataArray,
      []
    );
  }, []);

  return (
    <View>
      <SwipeView
        lowerHeight={150}
        upperHeight={350}
        lowerComponent={
          <WeekdayCalendar
            monthDataArray={monthDataArray}
            spaceBetweenPages={spaceBetweenPages}
          />
        }
        upperComponent={
          <CalendarDisplay
            monthDataArray={monthDataArray}
            spaceBetweenPages={spaceBetweenPages}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
